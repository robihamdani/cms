exports.renderDashboard = ((req, res, next) => {
    req.app.locals.layout = 'Dashboard';
    next();
});