import pool from "../database/connection.js";

async function getReviewsByVehicleId(vehicleId) {
  try {
    const result = await pool.query(
      `SELECT r.review_id, r.user_id, r.vehicle_id, r.rating, r.comment, r.created_at,
              u.first_name AS reviewer_first_name
       FROM dealership.reviews r
       JOIN dealership.users u ON u.user_id = r.user_id
       WHERE r.vehicle_id = $1
       ORDER BY r.created_at DESC`,
      [vehicleId]
    );

    return result.rows.map((row) => ({
      reviewId: row.review_id,
      userId: row.user_id,
      vehicleId: row.vehicle_id,
      rating: row.rating,
      comment: row.comment,
      createdAt: row.created_at,
      reviewerFirstName: row.reviewer_first_name
    }));
  } catch (error) {
    console.error("getReviewsByVehicleId error:", error);
    return [];
  }
}

async function getReviewById(reviewId) {
  try {
    const result = await pool.query(
      "SELECT * FROM dealership.reviews WHERE review_id = $1",
      [reviewId]
    );

    const row = result.rows[0];
    if (!row) return null;

    return {
      reviewId: row.review_id,
      userId: row.user_id,
      vehicleId: row.vehicle_id,
      rating: row.rating,
      comment: row.comment,
      isFlagged: row.is_flagged,
      createdAt: row.created_at
    };
  } catch (error) {
    console.error("getReviewById error:", error);
    return null;
  }
}

async function createReview({ userId, vehicleId, rating, comment }) {
  try {
    const result = await pool.query(
      `INSERT INTO dealership.reviews (user_id, vehicle_id, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING review_id`,
      [userId, vehicleId, rating, comment]
    );

    const row = result.rows[0];
    if (!row) return null;

    return { reviewId: row.review_id };
  } catch (error) {
    console.error("createReview error:", error);
    return null;
  }
}

async function updateReview(reviewId, { rating, comment }) {
  try {
    const result = await pool.query(
      `UPDATE dealership.reviews
       SET rating = $1, comment = $2
       WHERE review_id = $3
       RETURNING review_id`,
      [rating, comment, reviewId]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("updateReview error:", error);
    return null;
  }
}

async function deleteReview(reviewId) {
  try {
    await pool.query("DELETE FROM dealership.reviews WHERE review_id = $1", [reviewId]);
    return true;
  } catch (error) {
    console.error("deleteReview error:", error);
    return false;
  }
}

async function getAllReviews() {
  try {
    const result = await pool.query(
      `SELECT r.review_id, r.rating, r.comment, r.is_flagged, r.created_at,
              u.first_name AS reviewer_first_name,
              v.make, v.model
       FROM dealership.reviews r
       JOIN dealership.users u ON u.user_id = r.user_id
       JOIN dealership.vehicles v ON v.vehicle_id = r.vehicle_id
       ORDER BY r.created_at DESC`
    );

    return result.rows.map((row) => ({
      reviewId: row.review_id,
      rating: row.rating,
      comment: row.comment,
      isFlagged: row.is_flagged,
      createdAt: row.created_at,
      reviewerFirstName: row.reviewer_first_name,
      vehicleMake: row.make,
      vehicleModel: row.model
    }));
  } catch (error) {
    console.error("getAllReviews error:", error);
    return [];
  }
}

export {
  getReviewsByVehicleId,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getAllReviews
};