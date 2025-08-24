import express from "express";
import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.routes.js";

const app = express();

app.use(express.json());

// Usar las rutas de usuarios
app.use(userRouter);

// Usar las rutas de tareas
app.use(taskRouter);

//-------------------------------------------------------------------
//--------- ENDPOINT DISPARADO CUANDO NO SE ENCUENTRA UNA RUTA ------
app.use((req, res) => {
  res.status(404).send("Has ingresado una URL sin procesamiento");
});

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});