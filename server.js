import express from "express";
import dotenv from "dotenv";
import baseRoute from "./routes/baseRoute.js";
import pool from "./database/connection.js";
import session from "express-session";
import authRoute from "./routes/authRoute.js";
import accountRoute from "./routes/accountRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import vehicleRoute from "./routes/vehicleRoute.js";
import contactRoute from "./routes/contactRoute.js";
import flash from "connect-flash";
import reviewRoute from "./routes/reviewRoute.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 2
  }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.messages = {
    error: req.flash("error"),
    success: req.flash("success")
  };
  next();
});

app.set("view engine", "ejs");

app.use("/", baseRoute);
app.use("/", authRoute);
app.use("/", accountRoute);
app.use("/", inventoryRoute);
app.use("/", vehicleRoute);
app.use("/", contactRoute);
app.use("/", reviewRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});