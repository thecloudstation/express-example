'use strict';

const Feature = require('../models/Feature');

exports.createFeature = async (req, res, next) => {
    try {
        const { title, description, category, link } = req.body;
        if (!title || !description || !category || !link) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const featureData = {
            title, description, category, link,
            clickCount: 0,
            rating: 0,
            ratingCount: 0
        };
        const newFeature = await Feature.create(featureData);
        res.status(201).json(newFeature);
    } catch (error) {
        next(error);
    }
};

exports.getAllFeatures = async (req, res, next) => {
    try {
        const features = await Feature.find();
        res.json(features);
    } catch (error) {
        next(error);
    }
};

exports.getFeature = async (req, res, next) => {
    try {
        const feature = await Feature.findById(req.params.id);
        if (!feature) return res.status(404).json({ message: 'Feature not found' });
        res.json(feature);
    } catch (error) {
        next(error);
    }
};

exports.updateFeature = async (req, res, next) => {
    try {
        const { title, description, category, link } = req.body;
        if (!title || !description || !category || !link) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updatedFeature = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFeature) return res.status(404).json({ message: 'Feature not found' });
        res.json(updatedFeature);
    } catch (error) {
        next(error);
    }
};

exports.deleteFeature = async (req, res, next) => {
    try {
        const deletedFeature = await Feature.findByIdAndDelete(req.params.id);
        if (!deletedFeature) return res.status(404).json({ message: 'Feature not found' });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

exports.trackLinkClick = async (req, res, next) => {
    try {
        const feature = await Feature.findById(req.params.id);
        if (!feature) return res.status(404).json({ message: 'Feature not found' });

        feature.clickCount += 1;
        await Feature.findByIdAndUpdate(req.params.id, { clickCount: feature.clickCount });
        res.json({ message: 'Link click recorded', clickCount: feature.clickCount });
    } catch (error) {
        next(error);
    }
};

exports.rateFeature = async (req, res, next) => {
    try {
        const { rating } = req.body;
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
        }

        const feature = await Feature.findById(req.params.id);
        if (!feature) return res.status(404).json({ message: 'Feature not found' });

        const newRatingCount = feature.ratingCount + 1;
        const newRating = ((feature.rating * feature.ratingCount) + rating) / newRatingCount;

        const updatedFeature = await Feature.findByIdAndUpdate(req.params.id, {
            rating: newRating,
            ratingCount: newRatingCount
        }, { new: true });

        res.json({ message: 'Feature rating recorded', feature: updatedFeature });
    } catch (error) {
        next(error);
    }
};