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

function buildLogin(req, res) {
  res.render("pages/login", { title: "Login" });
}

async function loginAccount(req, res) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.render("pages/login", {
      title: "Login",
      error: "Invalid email or password."
    });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return res.render("pages/login", {
      title: "Login",
      error: "Invalid email or password."
    });
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