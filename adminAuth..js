module.exports = function (req, res, next) {
    if (!req.session.isAdmin) {
        return res.status(401).send("Unauthorized access");
    }
    next();
};
