function requireAdmin(req, res, next) {
    if (!req.session.admin) {
        return res.redirect('/dashboard/login');
    }
    next();
}

module.exports = requireAdmin; 
