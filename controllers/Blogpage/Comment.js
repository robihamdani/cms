const Comment = require("../../models/Home/Comment");
const Post = require("../../models/User/Post");

exports.postComments = (req, res) => {
  Post.findOne({ _id: req.body.id }).then(post => {
    const newComment = new Comment({
      user: req.user.id,
      body: req.body.body
    });

    post.comments.push(newComment);

    post.save().then(savedPost => {
      newComment.save().then(savedComment => {
        res.redirect(`/page/${post.id}`);
      });
    });
  });
};

exports.renderComments = (req, res) => {
  Comment.find({ user: req.user.id })
    .populate("user")
    .then(comments => {
      res.render("Dashboard/Comments/Index", { comments: comments });
    });
};

exports.deleteComments = (req, res) => {
  Comment.findOneAndDelete({ _id: req.params.id }).then(() => {
    Post.findOneAndUpdate(
      { comments: req.params.id },
      { $pull: { comments: req.params.id } },
      () => {
        req.flash("success_message", "Name Comment Deleted");
        res.redirect("/user/dashboard/commentindex");
      }
    );
  });
};
