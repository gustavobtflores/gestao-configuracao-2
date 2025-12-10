import Router from "express";

const moviesRouter = Router();
const movies = [
  {
    id: 1,
    title: "Inception",
  },
  {
    id: 2,
    title: "The Matrix",
  },
  {
    id: 3,
    title: "Interstellar",
  },
  {
    id: 4,
    title: "The Dark Knight",
  },
];

moviesRouter.get("/movies", (_req, res) => {
  res.status(200).json({
    data: movies,
  });
});

moviesRouter.post("/movies", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newMovie = {
    id: Date.now(),
    title,
  };

  movies.push(newMovie);

  res.status(201).json({ data: newMovie });
});

export { moviesRouter };
