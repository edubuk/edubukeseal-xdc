# Use the official Node.js 18 image as the base image
FROM node:18

RUN mkdir /ec_backend

# Create and set the working directory
WORKDIR /ec_backend

# Copy package.json and package-lock.json before installing dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force && npm cache clean --force

# Copy the rest of the application code
COPY . /ec_backend

# Set environment variables (consider passing these at runtime instead)
ENV AWS_KEY='CC4943D384E226A7C338'
ENV AWS_SECRET='ArF1IVYF7rm4OqfcVuB2shDtlEbFuRJkR9LKtxC4'
ENV SMART_CONTRACT='0x7B29389a13a2a2443581B511bfD3386eaC175802'
ENV PRIVATE_KEY='0xe8e1afe6fe58acd52072e33e62c9c29ac727e99da3e01532cf68bb8830aaa461'   
ENV RPC_URL='https://earpc.xinfin.network'

# Expose port 3001 for the application
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
