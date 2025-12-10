import express from "express";
import { moviesRouter } from "./controllers/routes/movies.js";

const app = express();

app.use(express.json());
app.use(moviesRouter);

export { app };
