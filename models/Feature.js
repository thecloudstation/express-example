const mongoose = require('mongoose');
const { getStorage } = require('../config/database');
const inMemoryStorage = require('../utils/inMemoryStorage');

const featureSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: {
        type: String,
        enum: ['Core', 'Advanced', 'Additional'],
        default: 'Core'
    },
    link: String,
    clickCount: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    ratingCount: { type: Number, default: 0 }
});

const MongoFeature = mongoose.model('Feature', featureSchema);

class Feature {
    static async find() {
        if (getStorage() === 'mongodb') {
            try {
                return await MongoFeature.find();
            } catch (error) {
                console.error('Error fetching features from MongoDB:', error);
                return inMemoryStorage.getAll();
            }
        } else {
            return inMemoryStorage.getAll();
        }
    }

    static async findById(id) {
        if (getStorage() === 'mongodb') {
            try {
                return await MongoFeature.findById(id);
            } catch (error) {
                console.error('Error fetching feature by ID from MongoDB:', error);
                return inMemoryStorage.get(id);
            }
        } else {
            return inMemoryStorage.get(id);
        }
    }

    static async create(data) {
        if (getStorage() === 'mongodb') {
            try {
                const feature = new MongoFeature(data);
                return await feature.save();
            } catch (error) {
                console.error('Error creating feature in MongoDB:', error);
                return inMemoryStorage.create(data);
            }
        } else {
            return inMemoryStorage.create(data);
        }
    }

    static async findByIdAndUpdate(id, data) {
        if (getStorage() === 'mongodb') {
            try {
                return await MongoFeature.findByIdAndUpdate(id, data, { new: true });
            } catch (error) {
                console.error('Error updating feature in MongoDB:', error);
                return inMemoryStorage.update(id, data);
            }
        } else {
            return inMemoryStorage.update(id, data);
        }
    }

    static async findByIdAndDelete(id) {
        if (getStorage() === 'mongodb') {
            try {
                return await MongoFeature.findByIdAndDelete(id);
            } catch (error) {
                console.error('Error deleting feature from MongoDB:', error);
                return inMemoryStorage.delete(id);
            }
        } else {
            return inMemoryStorage.delete(id);
        }
    }
}

module.exports = Feature;