import { pool } from "../config/db.js";

// Función para obtener todas las tareas
export const getAll = async () => {
  try {
    const query = "SELECT * FROM tareas";
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Could not fetch tasks from the database.");
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
    throw new Error(`Could not fetch task with id ${id} from the database.`);
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
    throw new Error("Could not create task in the database.");
  }
};

// Función para actualizar una tarea por su ID
export const updateById = async (id, task) => {
  try {
    const { titulo, descripcion, estado, fecha_limite, usuario_id } = task;
    const query =
      "UPDATE tareas SET titulo = ?, descripcion = ?, estado = ?, fecha_limite = ?, usuario_id = ? WHERE id = ?";
    const [result] = await pool.query(query, [
      titulo,
      descripcion,
      estado,
      fecha_limite,
      usuario_id,
      id
    ]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    throw new Error(`Could not update task with id ${id} in the database.`);
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
    throw new Error(`Could not delete task with id ${id} from the database.`);
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
    throw new Error(`Could not fetch tasks for user ${userId} from the database.`);
  }
};