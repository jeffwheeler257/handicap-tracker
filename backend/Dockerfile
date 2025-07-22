# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/backend

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your Express app listens on
EXPOSE 4000

# Command to run your application when the container starts
# Adjust based on your build output and entry fil
CMD ["npm", "run", "dev"]