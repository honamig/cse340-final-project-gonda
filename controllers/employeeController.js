import { getAllVehiclesAdmin, getVehicleById, updateVehicle } from "../models/vehicleModel.js";
import { getAllReviews, deleteReview } from "../models/reviewModel.js";

async function buildDashboard(req, res) {
  const vehicles = await getAllVehiclesAdmin();
  const reviews = await getAllReviews();

  res.render("pages/employee/dashboard", {
    title: "Employee Dashboard",
    vehicles,
    reviews
  });
}

async function buildEditVehicle(req, res) {
  const vehicleId = req.params.id;
  const vehicle = await getVehicleById(vehicleId);

  if (!vehicle) {
    req.flash("error", "Vehicle not found.");
    return res.redirect("/employee/dashboard");
  }

  res.render("pages/employee/edit-vehicle", { title: "Edit Vehicle", vehicle });
}

async function submitEditVehicle(req, res) {
  const vehicleId = req.params.id;
  const { price, description, availabilityStatus } = req.body;

  const updated = await updateVehicle(vehicleId, { price, description, availabilityStatus });

  if (!updated) {
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect(`/employee/vehicles/${vehicleId}/edit`);
  }

  req.flash("success", "Vehicle updated.");
  res.redirect("/employee/dashboard");
}

async function moderateReview(req, res) {
  const reviewId = req.params.id;
  await deleteReview(reviewId);
  req.flash("success", "Review removed.");
  res.redirect("/employee/dashboard");
}

export { buildDashboard, buildEditVehicle, submitEditVehicle, moderateReview };