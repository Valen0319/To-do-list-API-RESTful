import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.routes.js";

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

// --- SERVIR ARCHIVOS ESTÁTICOS ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// --- RUTAS DE LA API ---
app.use(userRouter);
app.use(taskRouter);

// --- RUTA RAÍZ ---
// Redirige al login por defecto
app.get("/", (req, res) => {
  res.redirect("/html/login.html");
});

// --- MANEJO DE ERRORES ---
app.use((req, res) => {
  res.status(404).send("Has ingresado una URL sin procesamiento");
});

// --- INICIAR SERVIDOR ---
app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
