import pool from "../database/connection.js";

async function createServiceRequest({ userId, vehicleId, serviceType, description }) {
  try {
    const result = await pool.query(
      `INSERT INTO dealership.service_requests (user_id, vehicle_id, service_type, description)
       VALUES ($1, $2, $3, $4)
       RETURNING request_id`,
      [userId, vehicleId, serviceType, description]
    );

    const row = result.rows[0];
    if (!row) return null;

    return { requestId: row.request_id };
  } catch (error) {
    console.error("createServiceRequest error:", error);
    return null;
  }
}

async function getServiceRequestsByUserId(userId) {
  try {
    const result = await pool.query(
      `SELECT sr.request_id, sr.vehicle_id, sr.service_type, sr.description,
              sr.status, sr.employee_notes, sr.created_at, sr.updated_at,
              v.make, v.model, v.year
       FROM dealership.service_requests sr
       LEFT JOIN dealership.vehicles v ON v.vehicle_id = sr.vehicle_id
       WHERE sr.user_id = $1
       ORDER BY sr.created_at DESC`,
      [userId]
    );

    return result.rows.map((row) => ({
      requestId: row.request_id,
      vehicleId: row.vehicle_id,
      serviceType: row.service_type,
      description: row.description,
      status: row.status,
      employeeNotes: row.employee_notes,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      vehicleMake: row.make,
      vehicleModel: row.model,
      vehicleYear: row.year
    }));
  } catch (error) {
    console.error("getServiceRequestsByUserId error:", error);
    return [];
  }
}

export { createServiceRequest, getServiceRequestsByUserId };