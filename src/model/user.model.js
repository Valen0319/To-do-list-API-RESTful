import { pool } from "../config/db.js";

export const findByEmail = async (email) => {
  try {
    const query = "SELECT * FROM usuarios WHERE email = ?";
    const [rows] = await pool.query(query, [email]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw new Error(`Could not fetch user with email ${email} from the database.`);
  }
};

export const getAll = async () => {
  try {
    const query = "SELECT * FROM usuarios";
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users from the database.");
  }
};

export const getById = async (id) => {
  try {
    const query = "SELECT * FROM usuarios WHERE id = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw new Error(`Could not fetch user with id ${id} from the database.`);
  }
};

export const create = async (user) => {
  try {
    const { nombre, apellido, email, password } = user;
    const query =
      "INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(query, [
      nombre,
      apellido,
      email,
      password,
    ]);
    return { id: result.insertId, ...user };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user in the database.");
  }
};

export const updateById = async (id, user) => {
  try {
    const fields = Object.keys(user);
    const values = Object.values(user);
    
    if (fields.length === 0) {
      return false; // No hay campos para actualizar
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE usuarios SET ${setClause} WHERE id = ?`;
    
    const [result] = await pool.query(query, [...values, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw new Error(`Could not update user with id ${id} in the database.`);
  }
};

export const deleteById = async (id) => {
  try {
    // Verificar si el usuario tiene tareas asignadas
    const checkTasksQuery = "SELECT COUNT(*) AS taskCount FROM tareas WHERE usuario_id = ?";
    const [taskRows] = await pool.query(checkTasksQuery, [id]);
    if (taskRows[0].taskCount > 0) {
      // Si tiene tareas, no permitir la eliminación
      throw new Error("El usuario tiene tareas asignadas y no puede ser eliminado.");
    }

    // Si no tiene tareas, proceder a eliminar
    const query = "DELETE FROM usuarios WHERE id = ?";
    const [result] = await pool.query(query, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw new Error(error.message || `Could not delete user with id ${id} from the database.`);
  }
};