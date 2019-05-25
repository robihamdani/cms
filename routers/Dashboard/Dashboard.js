const express = require('express');
const router = express.Router();
const DashboardControll = require('../../controllers/Dashboard/Dashboard');
const { ensureAuthenticated } = require('../../config/auth');
const renderdashboard = require('../../controllers/Dashboard/renderDashboard');


router.get('/*', ensureAuthenticated, renderdashboard.renderDashboard);
router.get('/', DashboardControll.renderPageDashboard);

module.exports = router;