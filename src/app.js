import express from "express";
import { moviesRouter } from "./controllers/routes/movies.js";

const app = express();

app.use(express.json());
app.use(moviesRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
