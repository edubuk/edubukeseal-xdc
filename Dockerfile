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
COPY --from=frontend-builder /src/app .

ENV NEXT_PUBLIC_APP_URL=https://www.edubukeseal.com

ENV CONTRACT_ADDRESS=0x7B29389a13a2a2443581B511bfD3386eaC175802

ENV API=https://edubukxdc-api-sknjoltd5q-uc.a.run.app/

RUN npm run build

CMD ["npm", "start"]



