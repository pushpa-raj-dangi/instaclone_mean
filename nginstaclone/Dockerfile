# Use the official Node.js image as the base image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install the dependencies
RUN npm install
RUN npm install -g @angular/cli

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Start the Angular application

CMD ["ng", "serve", "--host", "0.0.0.0"]
