import pool from "../database/connection.js";

async function createContactMessage({ name, email, subject, message }) {
  try {
    const result = await pool.query(
      `INSERT INTO dealership.contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING message_id`,
      [name, email, subject, message]
    );

    const row = result.rows[0];
    if (!row) return null;

    return { messageId: row.message_id };
  } catch (error) {
    console.error("createContactMessage error:", error);
    return null;
  }
}

export { createContactMessage };