import Router from "express";

const filmesRouter = Router();

filmesRouter.get("/filmes", (req, res) => {
  res.status(200).json({
    data: [
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
    ],
  });
});

export { filmesRouter };
