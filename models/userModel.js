import pool from "../database/connection.js";

async function getUserByEmail(email) {
  try {
    const result = await pool.query(
      "SELECT * FROM dealership.users WHERE email = $1",
      [email]
    );

    const row = result.rows[0];
    if (!row) return null;

    return {
      userId: row.user_id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
      createdAt: row.created_at
    };
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

    const row = result.rows[0];
    if (!row) return null;

    return {
      userId: row.user_id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      role: row.role
    };
  } catch (error) {
    console.error("createUser error:", error);
    return null;
  }
}

async function getAllStaff() {
  try {
    const result = await pool.query(
      "SELECT user_id, first_name, last_name, email, role FROM dealership.users WHERE role IN ('employee', 'owner') ORDER BY role, first_name"
    );

    return result.rows.map((row) => ({
      userId: row.user_id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      role: row.role
    }));
  } catch (error) {
    console.error("getAllStaff error:", error);
    return [];
  }
}

export { getUserByEmail, createUser, getAllStaff };