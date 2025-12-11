import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("Movies API", () => {
  describe("GET /movies", () => {
    it("should return a list of movies", async () => {
      const response = await request(app).get("/movies");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("POST /movies", () => {
    it("should create a new movie", async () => {
      const newMovie = { title: "The Godfather" };
      const response = await request(app).post("/movies").send(newMovie);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.title).toBe(newMovie.title);
    });

    it("should return 400 if title is missing", async () => {
      const response = await request(app).post("/movies").send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Title is required");
    });
  });

  describe("DELETE /movies", () => {
    it("should delete a movie", async () => {
      const newMovie = { title: "The Godfather" };
      const response = await request(app).post("/movies").send(newMovie);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.title).toBe(newMovie.title);

      const deleteResponse = await request(app).delete(
        `/movies/${response.body.data.id}`,
      );

      expect(deleteResponse.status).toBe(204);
    });

    it("should return 404 if movie does not exist", async () => {
      const response = await request(app).delete("/movies/9999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Movie not found");
    });
  });
});
