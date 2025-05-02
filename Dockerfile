# Base image for the frontend
FROM node:14-alpine AS frontend

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY apps/frontend/package.json ./
RUN npm install

# Copy the rest of the frontend code
COPY apps/frontend ./

# Build the frontend
RUN npm run build

# Base image for the backend
FROM node:14-alpine AS backend

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY apps/backend/package.json ./
RUN npm install

# Copy the rest of the backend code
COPY apps/backend ./

# Build the backend
RUN npm run build

# Final stage for running the application
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy built frontend and backend from previous stages
COPY --from=frontend /app /app/frontend
COPY --from=backend /app /app/backend

# Expose ports for frontend and backend
EXPOSE 3000
EXPOSE 4000

# Health check for the frontend
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Health check for the backend
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/health || exit 1

# Set up linting and prettier in CI pipeline
RUN npm run lint
RUN npm run prettier

# Configure type checking in CI pipeline
RUN npm run type-check

# Add testing pipeline for frontend and backend
RUN npm run test:frontend
RUN npm run test:backend

# Set up deployment workflows for frontend and backend
RUN npm run deploy:frontend
RUN npm run deploy:backend

# Start the application
CMD ["sh", "-c", "npm run start:frontend & npm run start:backend"]
