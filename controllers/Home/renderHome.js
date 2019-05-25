exports.renderHomeOnly = ((req, res, next) => {
    req.app.locals.layout = 'Home';
    next();
});