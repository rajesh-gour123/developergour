if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");

// Routes
const dashboard = require("./routes/dashboard");
const messageRoute = require("./routes/messageRoute");

// Utils
const ExpressError = require("./utils/expressError");


// -------------------- SESSION SETUP --------------------
const sessionOptions = {
  secret: process.env.SECRET || "fallbacksecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 30, // 30 minutes
  },
};

app.use(session(sessionOptions));


// -------------------- DATABASE --------------------
const Mongo_URL = process.env.ATLAS_URL;

async function main() {
  await mongoose.connect(Mongo_URL);
}

main()
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(`MongoDB Not Connected: ${err}`));


// -------------------- VIEW ENGINE --------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// -------------------- MIDDLEWARE --------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// -------------------- ROUTES --------------------
app.use("/", dashboard);
app.use("/client_msg", messageRoute);


// -------------------- ERROR HANDLING --------------------
app.use((err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).render("error", { message });
});


// -------------------- SERVER --------------------
app.listen(3000, () => {
  console.log("App is running on port 3000");
});
