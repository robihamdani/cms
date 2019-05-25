const express = require('express');
const router = express.Router();
const Usercontroll = require('../../controllers/Dashboard/User');
const { ensureAuthenticated } = require('../../config/auth');
const renderdashboard = require('../../controllers/Dashboard/renderDashboard');


router.get('/*', ensureAuthenticated, renderdashboard.renderDashboard);

router.get('/', Usercontroll.renderUser);

module.exports = router;