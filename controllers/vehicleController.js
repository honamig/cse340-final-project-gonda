import { getFeaturedVehicles, getAllCategories, getVehiclesByCategory } from "../models/vehicleModel.js";
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

export { buildHome, buildInventoryIndex, buildByCategory };