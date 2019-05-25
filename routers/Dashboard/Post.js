const express = require('express');
const router = express.Router();
const PostControll = require('../../controllers/Dashboard/Post');
const { ensureAuthenticated } = require('../../config/auth');
const renderdashboard = require('../../controllers/Dashboard/renderDashboard');


router.get('/*', ensureAuthenticated, renderdashboard.renderDashboard);

router.get('/*', ensureAuthenticated, renderdashboard.renderDashboard);

router.post('/', PostControll.sendPost);
router.get('/', PostControll.renderPost);

module.exports = router;