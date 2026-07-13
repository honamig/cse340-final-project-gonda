import bcrypt from "bcrypt";
import { getUserByEmail, createUser } from "../models/userModel.js";

function buildRegister(req, res) {
  res.render("pages/register", { title: "Register" });
}

async function registerAccount(req, res) {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    req.flash("error", "An account with this email already exists.");
    return res.redirect("/register");
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
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect("/register");
  }

  req.flash("success", "Account created! Please log in.");
  res.redirect("/login");
}

function buildLogin(req, res) {
  res.render("pages/login", { title: "Login" });
}

async function loginAccount(req, res) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    req.flash("error", "Invalid email or password.");
    return res.redirect("/login");
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    req.flash("error", "Invalid email or password.");
    return res.redirect("/login");
  }

  req.session.user = {
    id: user.userId,
    firstName: user.firstName,
    role: user.role
  };

  res.redirect("/");
}

function logoutAccount(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}

export { buildRegister, registerAccount, buildLogin, loginAccount, logoutAccount };