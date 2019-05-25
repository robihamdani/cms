exports.renderBlogPage = ((req, res, next) => {
    req.app.locals.layout = 'Blogpage';
    next();
})