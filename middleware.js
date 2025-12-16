const {contactSchema} = require("./models/contactSchema");
const ExpressError = require("./utils/expressError");

module.exports.validateContact = (req, res, next) => {
    const { error } = contactSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.isAdmin) {
        return res.render("admin/passwordPrompt"); // Show popup page
    }
    next();
};
