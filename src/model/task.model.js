import { pool } from "../config/db.js";

// Función para obtener todas las tareas
export const getAll = async () => {
  try {
    const query = "SELECT * FROM tareas";
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Función para obtener una tarea por su ID
export const getById = async (id) => {
  try {
    const query = "SELECT * FROM tareas WHERE id = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
};

// Función para crear una nueva tarea
export const create = async (task) => {
  try {
    const { titulo, descripcion, estado, fecha_limite, usuario_id } = task;
    const query = 
      "INSERT INTO tareas (titulo, descripcion, estado, fecha_limite, usuario_id) VALUES (?, ?, ?, ?, ?)";
    const [result] = await pool.query(query, [
      titulo,
      descripcion,
      estado || 'pendiente', // Si no se proporciona estado, por defecto será 'pendiente'
      fecha_limite,
      usuario_id,
    ]);
    return { id: result.insertId, ...task };
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Función para actualizar una tarea por su ID
export const updateById = async (id, task) => {
  try {
    const fields = Object.keys(task);
    const values = Object.values(task);
    
    if (fields.length === 0) {
      return false; // No hay campos para actualizar
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE tareas SET ${setClause} WHERE id = ?`;
    
    const [result] = await pool.query(query, [...values, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    throw error;
  }
};

// Función para eliminar una tarea por su ID
export const deleteById = async (id) => {
  try {
    const query = "DELETE FROM tareas WHERE id = ?";
    const [result] = await pool.query(query, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
    throw error;
  }
};

// Función para obtener todas las tareas de un usuario específico
export const getByUserId = async (userId) => {
  try {
    const query = "SELECT * FROM tareas WHERE usuario_id = ?";
    const [rows] = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    console.error(`Error fetching tasks for user ${userId}:`, error);
    throw error;
  }
};