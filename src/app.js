import express from "express";
import { filmesRouter } from "./controllers/routes/filmes.js";

const app = express();

app.use(express.json());
app.use(filmesRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
