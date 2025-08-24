import { getAll, getById, create, updateById, deleteById, getByUserId } from "../model/task.model.js"

// Controlador para obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await getAll();
    res.status(200).json(tasks); //agregué el status jeje
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

// Controlador para obtener una tarea por su ID
export const getTaskById = async (req, res) => {
  try {
    const task = await getById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para crear una nueva tarea
export const createTask = async (req, res) => {
  try {
    const newTask = await create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar una tarea por su ID
export const updateTaskById = async (req, res) => {
  try {
    const updated = await updateById(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json({ message: "Tarea actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar una tarea por su ID
export const deleteTask = async (req, res) => {
  try {
    const deleted = await deleteById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(204).json({ message: "Tarea eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener todas las tareas de un usuario específico
export const getTasksByUserId = async (req, res) => {
  try {
    const tasks = await getByUserId(req.params.userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};