const express = require('express');
const router = express.Router();
const ControllPostIndex = require('../../controllers/Dashboard/PostIndex');
const renderdashboard = require('../../controllers/Dashboard/renderDashboard');
const { ensureAuthenticated } = require('../../config/auth');


// router.get('/*', ensureAuthenticated, renderdashboard.renderDashboard);
router.get('/', ControllPostIndex.renderPostIndex);
router.delete('/:id', ControllPostIndex.deletePost);

router.get('/edit/:id', ControllPostIndex.renderPostEdit);
router.put('/edit/:id', ControllPostIndex.editPost);

module.exports = router;