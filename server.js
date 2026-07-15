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
import serviceRequestRoute from "./routes/serviceRequestRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import ownerRoute from "./routes/ownerRoute.js";
import connectPgSimple from "connect-pg-simple";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PgSession = connectPgSimple(session);

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
app.use("/", serviceRequestRoute);
app.use("/", employeeRoute);
app.use("/", ownerRoute);

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.status(404).render("pages/errors/404", { title: "Page Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("pages/errors/500", {
    title: "Server Error",
    message: process.env.NODE_ENV === "production" ? "Something went wrong on our end." : err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});