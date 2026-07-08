import bcrypt from "bcrypt";
import { getUserByEmail, createUser } from "../models/userModel.js";

function buildRegister(req, res) {
  res.render("pages/register", { title: "Register" });
}

async function registerAccount(req, res) {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.render("pages/register", {
      title: "Register",
      error: "An account with this email already exists."
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    firstName,
    lastName,
    email,
    passwordHash,
    role: "customer"
  });

  if (!newUser) {
    return res.render("pages/register", {
      title: "Register",
      error: "Something went wrong. Please try again."
    });
  }

  res.redirect("/login");
}

export { buildRegister, registerAccount };