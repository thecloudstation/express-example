const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

// Feature management routes
router.post('/features', featureController.createFeature);
router.get('/features', featureController.getAllFeatures);
router.get('/features/:id', featureController.getFeature);
router.put('/features/:id', featureController.updateFeature);
router.delete('/features/:id', featureController.deleteFeature);

// Feature interaction routes
router.post('/features/:id/click', featureController.trackLinkClick);
router.post('/features/:id/rate', featureController.rateFeature);

module.exports = router;