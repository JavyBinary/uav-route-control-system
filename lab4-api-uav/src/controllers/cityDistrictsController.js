const service = require('../services/cityDistrictsService');

const getAll = (req, res) => {
    const { title } = req.query;
    const districts = service.findAll(title);
    res.json(districts);
};

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const district = service.findOne(id);
    if (!district) return res.status(404).json({ error: 'Район не найден' });
    res.json(district);
};

const create = (req, res) => {
    const { title, areaSize, uavCount } = req.body;
    if (!title || !areaSize || uavCount === undefined) {
        return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
    }
    const newDistrict = service.create(req.body);
    res.status(201).json(newDistrict);
};

const update = (req, res) => {
    const id = parseInt(req.params.id);
    const updated = service.update(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Район не найден' });
    res.json(updated);
};

const remove = (req, res) => {
    const id = parseInt(req.params.id);
    const success = service.remove(id);
    if (!success) return res.status(404).json({ error: 'Район не найден' });
    res.status(204).send();
};

module.exports = { getAll, getById, create, update, remove };