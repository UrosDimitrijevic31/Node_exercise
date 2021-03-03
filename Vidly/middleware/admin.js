module.exports = function ( req, res, next) {
    //401 Unauthorized
    //403 Forbiden

    if(!req.user.isAdmin) return res.status(403).send('Acces denided.');
    next();
}