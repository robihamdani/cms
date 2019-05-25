module.exports = {
    ensureAuthenticated: ((req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }

        req.flash('error_message', 'please login to view this source')
        res.redirect('/login')
    })
}