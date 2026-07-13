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

async function getAllContactMessages() {
  try {
    const result = await pool.query(
      `SELECT message_id, name, email, subject, message, status, reply_text, created_at
       FROM dealership.contact_messages
       ORDER BY created_at DESC`
    );

    return result.rows.map((row) => ({
      messageId: row.message_id,
      name: row.name,
      email: row.email,
      subject: row.subject,
      message: row.message,
      status: row.status,
      replyText: row.reply_text,
      createdAt: row.created_at
    }));
  } catch (error) {
    console.error("getAllContactMessages error:", error);
    return [];
  }
}

async function replyToContactMessage(messageId, replyText) {
  try {
    const result = await pool.query(
      `UPDATE dealership.contact_messages
       SET reply_text = $1, status = 'replied'
       WHERE message_id = $2
       RETURNING message_id`,
      [replyText, messageId]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("replyToContactMessage error:", error);
    return null;
  }
}

export { createContactMessage, getAllContactMessages, replyToContactMessage };