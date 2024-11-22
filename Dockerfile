# Use official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Define environment variable for production
ENV NODE_ENV=production

# Run the app when the container starts
CMD ["npm", "start"]