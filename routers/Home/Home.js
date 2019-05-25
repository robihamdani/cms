const express = require('express');
const router = express.Router();
const Homecontroll = require('../../controllers/Home/Home');
const renderHome = require('../../controllers/Home/renderHome');

// middleware


// page home
router.get('/*', renderHome.renderHomeOnly);
router.get('/', Homecontroll.renderHome);

// register user
router.post('/register', Homecontroll.registerUser);
router.get('/register', Homecontroll.renderRegisterUser)

// login user
router.get('/login', Homecontroll.renderLogin);
router.post('/login', Homecontroll.loginUser);
router.get('/logout', Homecontroll.logout);

// about
router.get('/about', Homecontroll.about);

module.exports = router;