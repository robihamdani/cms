const express = require("express");
const router = express.Router();
const CommentControll = require("../../controllers/Dashboard/Comment");
const { ensureAuthenticated } = require("../../config/auth");
const renderdashboard = require("../../controllers/Dashboard/renderDashboard");

router.get("/*", ensureAuthenticated, renderdashboard.renderDashboard);
router.get("/", CommentControll.renderComments);
router.delete("/:id", CommentControll.deleteComments);

module.exports = router;
