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

    return result.rows.map((row) => ({
      vehicleId: row.vehicle_id,
      make: row.make,
      model: row.model,
      year: row.year,
      price: row.price,
      imageUrl: row.image_url
    }));
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

    return result.rows.map((row) => ({
      categoryId: row.category_id,
      name: row.name,
      description: row.description
    }));
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

    return result.rows.map((row) => ({
      vehicleId: row.vehicle_id,
      make: row.make,
      model: row.model,
      year: row.year,
      price: row.price,
      mileage: row.mileage,
      imageUrl: row.image_url
    }));
  } catch (error) {
    console.error("getVehiclesByCategory error:", error);
    return [];
  }
}

async function getVehicleById(vehicleId) {
  try {
    const result = await pool.query(
      `SELECT v.vehicle_id, v.make, v.model, v.year, v.price, v.mileage,
              v.description, v.availability_status, c.name AS category_name
       FROM dealership.vehicles v
       LEFT JOIN dealership.categories c ON c.category_id = v.category_id
       WHERE v.vehicle_id = $1`,
      [vehicleId]
    );

    const row = result.rows[0];
    if (!row) return null;

    return {
      vehicleId: row.vehicle_id,
      make: row.make,
      model: row.model,
      year: row.year,
      price: row.price,
      mileage: row.mileage,
      description: row.description,
      availabilityStatus: row.availability_status,
      categoryName: row.category_name
    };
  } catch (error) {
    console.error("getVehicleById error:", error);
    return null;
  }
}

async function getVehicleImages(vehicleId) {
  try {
    const result = await pool.query(
      `SELECT image_id, image_url, is_primary
       FROM dealership.vehicle_images
       WHERE vehicle_id = $1
       ORDER BY is_primary DESC, image_id ASC`,
      [vehicleId]
    );

    return result.rows.map((row) => ({
      imageId: row.image_id,
      imageUrl: row.image_url,
      isPrimary: row.is_primary
    }));
  } catch (error) {
    console.error("getVehicleImages error:", error);
    return [];
  }
}

export {
  getFeaturedVehicles,
  getAllCategories,
  getVehiclesByCategory,
  getVehicleById,
  getVehicleImages
};