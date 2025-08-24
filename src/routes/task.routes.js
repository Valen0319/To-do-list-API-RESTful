import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTask,
  getTasksByUserId,
} from "../controller/task.controller.js";

// Crear una instancia del router de Express
const router = Router();

// Ruta GET para obtener todas las tareas
// Endpoint: GET /tareas
// Esto Retorna un array con todas las tareas de la base de datos
router.get("/tareas", getAllTasks);

// Ruta GET para obtener una tarea específica por su ID
// Endpoint: GET /tareas/:id
// Esto Retorna una tarea específica basada en el ID proporcionado en los parámetros
router.get("/tareas/:id", getTaskById);

// Ruta POST para crear una nueva tarea
// Endpoint: POST /tareas
// Esto Crea una nueva tarea con los datos enviados en el body de la petición
router.post("/tareas", createTask);

// Ruta PUT para actualizar una tarea existente por su ID
// Endpoint: PUT /tareas/:id
// Esto Actualiza todos los campos de una tarea específica identificada por el ID
router.put("/tareas/:id", updateTaskById);

// Ruta DELETE para eliminar una tarea por su ID
// Endpoint: DELETE /tareas/:id
// Esto Elimina permanentemente una tarea de la base de datos basada en el ID
router.delete("/tareas/:id", deleteTask);

// Ruta GET para obtener todas las tareas de un usuario específico
// Endpoint: GET /usuarios/:userId/tareas
// Y Esto Retorna todas las tareas asignadas a UN usuario específico
router.get("/usuarios/:userId/tareas", getTasksByUserId);

export default router;