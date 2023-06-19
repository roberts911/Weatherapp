# Use Node.js version 16 as the base image
FROM node:16 

# Set the working directory in the Docker image to '/app'
WORKDIR /app

# Copy both package.json and package-lock.json to the current directory in the Docker image
COPY package*.json ./

# Install all the dependencies from package.json
RUN npm install

# Copy all the other source code files to the current directory in the Docker image
COPY . .

# Expose port 9000 to have it mapped by Docker daemon
EXPOSE 9000

# Start the application by running 'npm start' command
CMD ["npm", "start"]
