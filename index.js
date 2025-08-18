import express from "express";
const app = express();

app.use((req, res) => {
  res.status(404).send("Has ingresado una URL sin procesamiento");
});

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});