import { getAllVehiclesAdmin, getVehicleById, updateVehicle } from "../models/vehicleModel.js";
import { getAllReviews, deleteReview } from "../models/reviewModel.js";
import {
  getAllServiceRequests,
  getServiceRequestById,
  updateServiceRequestStatus
} from "../models/serviceRequestModel.js";
import { getAllContactMessages, replyToContactMessage } from "../models/contactModel.js";

async function buildDashboard(req, res) {
  const vehicles = await getAllVehiclesAdmin();
  const reviews = await getAllReviews();
  const serviceRequests = await getAllServiceRequests();
  const contactMessages = await getAllContactMessages();

  res.render("pages/employee/dashboard", {
    title: "Employee Dashboard",
    vehicles,
    reviews,
    serviceRequests,
    contactMessages
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

async function buildEditServiceRequest(req, res) {
  const requestId = req.params.id;
  const request = await getServiceRequestById(requestId);

  if (!request) {
    req.flash("error", "Service request not found.");
    return res.redirect("/employee/dashboard");
  }

  res.render("pages/employee/edit-service-request", { title: "Update Service Request", request });
}

async function submitEditServiceRequest(req, res) {
  const requestId = req.params.id;
  const { status, employeeNotes } = req.body;

  await updateServiceRequestStatus(requestId, { status, employeeNotes });

  req.flash("success", "Service request updated.");
  res.redirect("/employee/dashboard");
}

async function submitContactReply(req, res) {
  const messageId = req.params.id;
  const { replyText } = req.body;

  await replyToContactMessage(messageId, replyText);

  req.flash("success", "Reply saved.");
  res.redirect("/employee/dashboard");
}

export {
  buildDashboard,
  buildEditVehicle,
  submitEditVehicle,
  moderateReview,
  buildEditServiceRequest,
  submitEditServiceRequest,
  submitContactReply
};