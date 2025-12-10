import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Movies API', () => {
  describe('GET /movies', () => {
    it('should return a list of movies', async () => {
      const response = await request(app).get('/movies');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('POST /movies', () => {
    it('should create a new movie', async () => {
      const newMovie = { title: 'The Godfather' };
      const response = await request(app).post('/movies').send(newMovie);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe(newMovie.title);
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app).post('/movies').send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Title is required');
    });
  });
});
