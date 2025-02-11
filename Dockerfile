# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
# Stage 1: Build
FROM node:22.12-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN --mount=type=cache,target=/root/.npm npm install

# Copy the rest of the source code
COPY tsconfig.json ./
COPY src ./src

# Build the TypeScript files
RUN npm run build

# Stage 2: Release
FROM node:22-alpine AS release

# Set working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/build ./build

# Copy node_modules for runtime
COPY --from=builder /app/node_modules ./node_modules

# Copy the package.json for runtime metadata
COPY package.json ./

# Copy the environment configuration
# (Make sure to create or provide the .env file in the docker build context)
COPY .env .env

# Set the environment variable for production
ENV NODE_ENV=production

# Expose the necessary port (if required by the server, adjust accordingly)
# EXPOSE 3000

# Define the command to run the server
CMD ["node", "build/index.js"]
