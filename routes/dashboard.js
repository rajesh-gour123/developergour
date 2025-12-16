const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { validateContact } = require("../middleware");
const Client_Msg = require("../models/client");

// Home Page
router.get("/", (req, res) => {
    res.render("Home/index");
});

// submit route
router.post("/submit", validateContact, wrapAsync(async (req, res) => {

    const { name, email, message } = req.body;

    // Prevent duplicate spam messages in a minute
    const lastMsg = await Client_Msg.findOne({ email }).sort({ createdAt: -1 });

    if (lastMsg) {
        const diff = (Date.now() - lastMsg.createdAt) / 1000;
        if (diff < 30) {
            return res.json({
                success: false,
                error: "Please wait 30 seconds before sending another message."
            });
        }
    }

    const newMessage = new Client_Msg({ name, email, message });
    await newMessage.save();

    return res.json({ success: true, msg: "Message received successfully!" });
}));

router.get("/projects", (req, res) => {
  res.render("admin/allProject");
});

module.exports = router;
