import express from "express";
import userRouter from "./src/routes/user.routes.js";

const app = express();

app.use(express.json());

app.use(userRouter);

//-------------------------------------------------------------------
//--------- ENDPOINT DISPARADO CUANDO NO SE ENCUENTRA UNA RUTA ------
app.use((req, res) => {
  res.status(404).send("Has ingresado una URL sin procesamiento");
});

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});