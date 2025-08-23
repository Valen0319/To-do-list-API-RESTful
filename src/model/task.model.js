import { pool } from "../config/db.js";

export const getAll = async () => {
  try {
    const query = "SELECT * FROM tareas";
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users from the database.");
  }
};