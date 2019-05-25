const Post = require('../../models/User/Post');
const Category = require('../../models/User/Category');
const { isEmpty } = require('../../config/upload');
const Joi = require('joi')

exports.renderPost = ((req, res) => {
    Category.find({})
        .then(category => {
            res.render('Dashboard/Post/Create', { category: category })
        })

})

exports.sendPost = ((req, res) => {
    const { title, status, category, body } = req.body

    const validatePost = require('../../validators/Dashboard/Post');
    const resultPost = Joi.validate({ title, body }, validatePost);

    if (resultPost.error) {

        req.flash('error_message', resultPost.error.details[0].message)
        res.redirect('/user/dashboard/post')
        return;
    }

    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    // bagian upload file
    let filename = '';
    if (!isEmpty(req.files)) {

        let file = req.files.file;
        filename = Date.now() + '-' + file.name;

        if (!filename || filename.match(/\.(jpg|jpeg|png|''|)$/i)) {
            file.mv('./public/uploads/' + filename, (err) => {
                if (err) throw err;
            })
        } else {
            req.flash('error_message', 'Only Upload Image');
            res.redirect('/user/dashboard/post');
            return;
        }

    }


    const newPost = new Post({
        title, status, category, allowComments, body,
        file: filename
    })

    newPost.save()
        .then(() => {
            req.flash('success_message', 'Create Post Was Success')
            res.redirect('/user/dashboard/postindex')
        })

})