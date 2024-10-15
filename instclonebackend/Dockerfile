# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or pnpm-lock.yaml if using pnpm)
COPY package*.json ./
# If using pnpm, uncomment the next line and comment the previous one
# COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install
# If using pnpm, uncomment the next line and comment the previous one
# RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["node", "index.js"]
