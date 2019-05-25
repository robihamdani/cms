const express = require('express');
const router = express.Router();
const Categorycontroll = require('../../controllers/Dashboard/Category');
const renderdashboard = require('../../controllers/Dashboard/renderDashboard');
const { ensureAuthenticated } = require('../../config/auth');


router.get('/*', ensureAuthenticated, renderdashboard.renderDashboard);


router.get('/edit/:id', Categorycontroll.renderEditCategory);
router.put('/edit/:id', Categorycontroll.editCategory);


router.get('/', Categorycontroll.renderKategori);
router.post('/', Categorycontroll.categoryPost);
router.delete('/:id', Categorycontroll.deleteCategory);


module.exports = router;