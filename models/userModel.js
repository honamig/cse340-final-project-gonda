import pool from "../database/connection.js";

async function getUserByEmail(email) {
  try {
    const result = await pool.query(
      "SELECT * FROM dealership.users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("getUserByEmail error:", error);
    return null;
  }
}

async function createUser({ firstName, lastName, email, passwordHash, role }) {
  try {
    const result = await pool.query(
      `INSERT INTO dealership.users (first_name, last_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING user_id, first_name, last_name, email, role`,
      [firstName, lastName, email, passwordHash, role]
    );
    return result.rows[0];
  } catch (error) {
    console.error("createUser error:", error);
    return null;
  }
}

export { getUserByEmail, createUser };