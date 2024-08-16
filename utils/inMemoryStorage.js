const { v4: uuidv4 } = require('uuid');

let features = [];

module.exports = {
    getAll: () => features,
    get: (id) => features.find(f => f._id === id),
    create: (data) => {
        const newFeature = { ...data, _id: uuidv4() };
        features.push(newFeature);
        return newFeature;
    },
    update: (id, data) => {
        const index = features.findIndex(f => f._id === id);
        if (index !== -1) {
            features[index] = { ...features[index], ...data };
            return features[index];
        }
        return null;
    },
    delete: (id) => {
        const index = features.findIndex(f => f._id === id);
        if (index !== -1) {
            const [deletedFeature] = features.splice(index, 1);
            return deletedFeature;
        }
        return null;
    }
};