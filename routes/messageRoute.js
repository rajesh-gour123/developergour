const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const Client_Msg = require("../models/client");

//Password Check Here
router.post("/check-password", (req, res) => {
    const { pass } = req.body;

    if (!pass) {
        return res.json({ ok: false });
    }
    if (pass === process.env.ADMIN_PASSWORD) {
        req.session.isAdmin = true;

        req.session.save(() => {
            return res.json({ ok: true });
        });
    } else {
        return res.json({ ok: false });
    }
});




//show route
router.get("/show", isLoggedIn, wrapAsync(async (req, res) => {
    let messages = await Client_Msg.find({}).sort({ createdAt: -1 });
    messages.forEach(msg => {
        if (msg.createdAt instanceof Date && !isNaN(msg.createdAt)) {
            msg.formattedDate = msg.createdAt.toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });
        } else {
            msg.formattedDate = "No date available";
        }
    });
    res.render("admin/show", { messages })
    console.log(messages)

}));

module.exports = router;
