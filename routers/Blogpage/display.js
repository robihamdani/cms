const express = require("express");
const router = express.Router();
const diplayControll = require("../../controllers/Blogpage/display");
const renderBlogPage = require("../../controllers/Blogpage/renderBlogPage");

router.get("/*", renderBlogPage.renderBlogPage);
router.get("/:id", diplayControll.renderBlogPageDisplay);

module.exports = router;
