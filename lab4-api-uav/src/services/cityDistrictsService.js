const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title) => {
    const districts = fileService.readData(dataFilePath);
    if (title) {
        return districts.filter(d => 
            d.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return districts;
};

const findOne = (id) => {
    const districts = fileService.readData(dataFilePath);
    return districts.find(d => d.id === id);
};

const create = (data) => {
    const districts = fileService.readData(dataFilePath);
    const newId = districts.length > 0 ? Math.max(...districts.map(d => d.id)) + 1 : 1;
    const newDistrict = { id: newId, ...data };
    districts.push(newDistrict);
    fileService.writeData(dataFilePath, districts);
    return newDistrict;
};

const update = (id, data) => {
    const districts = fileService.readData(dataFilePath);
    const index = districts.findIndex(d => d.id === id);
    if (index === -1) return null;
    
    districts[index] = { ...districts[index], ...data };
    fileService.writeData(dataFilePath, districts);
    return districts[index];
};

const remove = (id) => {
    const districts = fileService.readData(dataFilePath);
    const filtered = districts.filter(d => d.id !== id);
    if (filtered.length === districts.length) return false;
    
    fileService.writeData(dataFilePath, filtered);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };