# Use Node 18
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose port
EXPOSE 5000

# Start the backend
CMD ["node", "index.js"]
