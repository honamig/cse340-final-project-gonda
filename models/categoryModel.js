import pool from "../database/connection.js";

async function createCategory({ name, description }) {
  try {
    const result = await pool.query(
      `INSERT INTO dealership.categories (name, description)
       VALUES ($1, $2)
       RETURNING category_id`,
      [name, description]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("createCategory error:", error);
    return null;
  }
}

async function deleteCategory(categoryId) {
  try {
    await pool.query("DELETE FROM dealership.categories WHERE category_id = $1", [categoryId]);
    return true;
  } catch (error) {
    console.error("deleteCategory error:", error);
    return false;
  }
}

export { createCategory, deleteCategory };