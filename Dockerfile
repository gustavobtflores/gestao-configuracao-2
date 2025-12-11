# Base image
FROM node:24-alpine AS base
WORKDIR /app
COPY package*.json ./

# Dev image
FROM base AS dev
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Production deps only
FROM base AS prod-deps
RUN npm ci --omit=dev

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .

EXPOSE 8000
CMD ["node", "src/server.js"]
