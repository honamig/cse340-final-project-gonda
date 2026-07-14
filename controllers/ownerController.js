import bcrypt from "bcrypt";
import { getAllVehiclesAdmin, createVehicle, deleteVehicle, getAllCategories } from "../models/vehicleModel.js";
import { createCategory, deleteCategory } from "../models/categoryModel.js";
import { getAllStaff, createUser, getUserByEmail } from "../models/userModel.js";

async function buildDashboard(req, res) {
  const vehicles = await getAllVehiclesAdmin();
  const categories = await getAllCategories();
  const staff = await getAllStaff();

  res.render("pages/owner/dashboard", { title: "Owner Dashboard", vehicles, categories, staff });
}

function buildAddCategory(req, res) {
  res.render("pages/owner/add-category", { title: "Add Category" });
}

async function submitAddCategory(req, res) {
  const { name, description } = req.body;

  if (!name || name.trim() === "") {
    req.flash("error", "Category name is required.");
    return res.redirect("/owner/categories/add");
  }

  const category = await createCategory({ name: name.trim(), description });

  if (!category) {
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect("/owner/categories/add");
  }

  req.flash("success", "Category added.");
  res.redirect("/owner/dashboard");
}

async function removeCategory(req, res) {
  await deleteCategory(req.params.id);
  req.flash("success", "Category deleted.");
  res.redirect("/owner/dashboard");
}

async function buildAddVehicle(req, res) {
  const categories = await getAllCategories();
  res.render("pages/owner/add-vehicle", { title: "Add Vehicle", categories });
}

async function submitAddVehicle(req, res) {
  const { categoryId, make, model, year, price, mileage, description } = req.body;

  if (!make || !model || !year || !price) {
    req.flash("error", "Make, model, year, and price are required.");
    return res.redirect("/owner/vehicles/add");
  }

  const vehicle = await createVehicle({ categoryId, make, model, year, price, mileage, description });

  if (!vehicle) {
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect("/owner/vehicles/add");
  }

  req.flash("success", "Vehicle added.");
  res.redirect("/owner/dashboard");
}

async function removeVehicle(req, res) {
  await deleteVehicle(req.params.id);
  req.flash("success", "Vehicle removed.");
  res.redirect("/owner/dashboard");
}

async function submitAddEmployee(req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    req.flash("error", "All fields are required.");
    return res.redirect("/owner/dashboard");
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    req.flash("error", "An account with this email already exists.");
    return res.redirect("/owner/dashboard");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const employee = await createUser({ firstName, lastName, email, passwordHash, role: "employee" });

  if (!employee) {
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect("/owner/dashboard");
  }

  req.flash("success", "Employee account created.");
  res.redirect("/owner/dashboard");
}

export {
  buildDashboard,
  buildAddCategory,
  submitAddCategory,
  removeCategory,
  buildAddVehicle,
  submitAddVehicle,
  removeVehicle,
  submitAddEmployee
};