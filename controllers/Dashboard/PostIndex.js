const Post = require("../../models/User/Post");
const Category = require("../../models/User/Category");
const { uploadDir } = require("../../config/deleteFile");
const fs = require("fs");

exports.renderPostIndex = (req, res) => {
  Post.find({})
    .populate("category")
    .then(postRender => {
      res.render("Dashboard/Post/Index", { postRender: postRender });
    });
};

exports.deletePost = (req, res) => {
  Post.findOneAndRemove({ _id: req.params.id })
    .populate("comments")
    .then(post => {
      fs.unlink(uploadDir + post.file, err => {
        if (!post.comments.length < 1) {
          post.comments.forEach(comment => {
            comment.remove();
          });
        }
        post.remove().then(() => {
          req.flash("success_message", "Post Deleted Success");
          res.redirect("/user/dashboard/postindex");
        });
      });
    });
};

exports.renderPostEdit = (req, res) => {
  Post.findOne({ _id: req.params.id }).then(post => {
    Category.find({}).then(category => {
      res.render("Dashboard/Post/Edit", { post: post, category: category });
    });
  });
};

exports.editCategory = (req, res) => {
  Category.findOneAndUpdate({ _id: req.params.id }).then(category => {
    category.name = req.body.name;
    category.save().then(() => {
      req.flash("success_message", "Name Category Updated");
      res.redirect("/user/dashboard/category");
    });
  });
};

exports.editPost = (req, res) => {
  Post.findOne({ _id: req.params.id }).then(post => {
    const { title, body, category, status } = req.body;

    if (req.body.allowComments) {
      allowComments = true;
    } else {
      allowComments = false;
    }

    post.title = title;
    post.body = body;
    post.category = category;
    post.allowComments = allowComments;
    post.status = status;

    post.save().then(() => {
      req.flash("success_message", "Post Success Updated");
      res.redirect("/user/dashboard/postindex");
    });
  });
};
