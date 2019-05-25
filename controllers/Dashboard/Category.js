const Category = require("../../models/User/Category");
const Joi = require("joi");

exports.renderKategori = (req, res) => {
  Category.find({}).then(category => {
    res.render("Dashboard/Category/Category", { category: category });
  });
};

exports.categoryPost = (req, res) => {
  const { name } = req.body;

  const validateCategory = require("../../validators/Dashboard/Category");
  const resultCategory = Joi.validate(req.body, validateCategory);

  if (resultCategory.error) {
    req.flash("error_message", resultCategory.error.details[0].message);
    res.redirect("/user/dashboard/category");
    return;
  }

  const newCategory = new Category({
    name
  });

  newCategory.save().then(() => {
    req.flash("success_message", "Name Category Saved");
    res.redirect("/user/dashboard/category");
  });
};

exports.deleteCategory = (req, res) => {
  Category.findOneAndDelete({ _id: req.params.id }).then(() => {
    req.flash("success_message", "Name Category Deleted");
    res.redirect("/user/dashboard/category");
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

exports.renderEditCategory = (req, res) => {
  Category.findOne({ _id: req.params.id }).then(category => {
    res.render("Dashboard/Category/Edit", { category: category });
  });
};
