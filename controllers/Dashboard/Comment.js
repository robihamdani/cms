const Comment = require("../../models/Home/Comment");

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
