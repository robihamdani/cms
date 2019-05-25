const Post = require("../../models/User/Post");
const Category = require("../../models/User/Category");
const User = require("../../models/User/User");

exports.renderBlogPageDisplay = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate({
      path: "comments",
      populate: {
        // path take from models/home/comment
        path: "user",
        // model take it from name database
        model: "user"
      }
    })
    .then(post => {
      Category.find({}).then(category => {
        User.find({ user: req.user.id }).then(user => {
          res.render("Blogpage/display", {
            post: post,
            category: category,
            user: user
          });
        });
      });
    });
};
