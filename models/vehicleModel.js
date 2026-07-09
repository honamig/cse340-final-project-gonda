import pool from "../database/connection.js";

async function getFeaturedVehicles() {
  try {
    const result = await pool.query(
      `SELECT v.vehicle_id, v.make, v.model, v.year, v.price, vi.image_url
       FROM dealership.vehicles v
       LEFT JOIN dealership.vehicle_images vi
         ON vi.vehicle_id = v.vehicle_id AND vi.is_primary = TRUE
       ORDER BY v.created_at DESC
       LIMIT 3`
    );
    return result.rows;
  } catch (error) {
    console.error("getFeaturedVehicles error:", error);
    return [];
  }
}

async function getAllCategories() {
  try {
    const result = await pool.query(
      "SELECT category_id, name, description FROM dealership.categories ORDER BY name"
    );
    return result.rows;
  } catch (error) {
    console.error("getAllCategories error:", error);
    return [];
  }
}

async function getVehiclesByCategory(categoryName, sort) {
  const allowedSorts = {
    price_asc: "v.price ASC",
    price_desc: "v.price DESC",
    year_desc: "v.year DESC",
    year_asc: "v.year ASC"
  };
  const orderBy = allowedSorts[sort] || "v.created_at DESC";

  try {
    const result = await pool.query(
      `SELECT v.vehicle_id, v.make, v.model, v.year, v.price, v.mileage, vi.image_url
       FROM dealership.vehicles v
       JOIN dealership.categories c ON c.category_id = v.category_id
       LEFT JOIN dealership.vehicle_images vi
         ON vi.vehicle_id = v.vehicle_id AND vi.is_primary = TRUE
       WHERE c.name = $1
       ORDER BY ${orderBy}`,
      [categoryName]
    );
    return result.rows;
  } catch (error) {
    console.error("getVehiclesByCategory error:", error);
    return [];
  }
}

export { getFeaturedVehicles, getAllCategories, getVehiclesByCategory };