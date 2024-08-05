FROM node:20 AS frontend-builder

# Set the working directory to /app
WORKDIR /src/app

# Copy the package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

FROM node:20-slim

# Set the working directory to /app
WORKDIR /src/app

# Copy built assets and dependencies from frontend-builder stage
COPY --from=frontend-builder /app .

RUN npm run build

CMD ["npm", "start"]
