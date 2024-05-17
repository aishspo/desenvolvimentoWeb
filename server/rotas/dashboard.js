/* eslint-disable @typescript-eslint/no-var-requires */
// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controladores/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, dashboardController.dashboard);

module.exports = router;
