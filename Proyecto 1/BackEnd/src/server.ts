import express from "express";
import "dotenv/config";
import router from "./router";
import { connectDB } from "./config/db";

const app = express();

connectDB();

// Habilitación de leer datos del formularios (en express no esta activado por defecto)
app.use(express.json());

app.use("/", router); //use es para que entre a nuestro router y mapear la peticion con la url de forma correcta

export default app;
