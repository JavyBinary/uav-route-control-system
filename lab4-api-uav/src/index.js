const express = require('express');
const path = require('path');
const routes = require('./routes/city_districts');
const service = require('./services/cityDistrictsService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/city_districts.json');
service.init(DATA_FILE_PATH);

app.use(express.json());

// Раздача статики из папки public
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/city_districts', routes);

// Для поддержки клиентского роутинга (SPA) возвращаем index.html на любой неизвестный GET запрос
app.get(/(.*)/, (req, res, next) => {
    if (req.url.startsWith('/city_districts')) return next();
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((req, res) => res.status(404).json({ error: 'Маршрут не найден' }));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер БПЛА запущен: http://localhost:${PORT}`);
});