import { Router } from "express";
import { getAllTasks } from "../controller/task.controller.js";

const router = Router();

router.get("/tareas", getAllTasks);

export default router;