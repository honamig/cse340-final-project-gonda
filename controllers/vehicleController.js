import { getReviewsByVehicleId } from "../models/reviewModel.js";
import {
  getFeaturedVehicles,
  getAllCategories,
  getVehiclesByCategory,
  getVehicleById,
  getVehicleImages
} from "../models/vehicleModel.js";

async function buildHome(req, res) {
  const featuredVehicles = await getFeaturedVehicles();
  res.render("pages/home", { title: "Home", featuredVehicles });
}

async function buildInventoryIndex(req, res) {
  const categories = await getAllCategories();
  res.render("pages/inventory/index", { title: "Browse Vehicles", categories });
}

async function buildByCategory(req, res) {
  const categoryName = req.params.category;
  const sort = req.query.sort;

  const vehicles = await getVehiclesByCategory(categoryName, sort);

  res.render("pages/inventory/category", {
    title: `${categoryName} for Sale`,
    categoryName,
    vehicles,
    sort
  });
}

async function buildVehicleDetail(req, res) {
  const vehicleId = req.params.id;
  const vehicle = await getVehicleById(vehicleId);

  if (!vehicle) {
    return res.status(404).send("Vehicle not found.");
  }

  const images = await getVehicleImages(vehicleId);
  const reviews = await getReviewsByVehicleId(vehicleId);

  res.render("pages/vehicle", {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    vehicle,
    images,
    reviews
  });
}

export { buildHome, buildInventoryIndex, buildByCategory, buildVehicleDetail };