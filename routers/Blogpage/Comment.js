const express = require("express");
const router = express.Router();
const CommentControll = require("../../controllers/Blogpage/Comment");
const { ensureAuthenticated } = require("../../config/auth");

router.post("/", ensureAuthenticated, CommentControll.postComments);

module.exports = router;
