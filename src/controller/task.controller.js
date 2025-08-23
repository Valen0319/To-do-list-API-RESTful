import { getAll } from "../model/task.model.js"

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await getAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};