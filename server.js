import express from "express";
import dotenv from "dotenv";
import baseRoute from "./routes/baseRoute.js";
import pool from "./database/connection.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", baseRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});