FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port 3000 for React dev server
EXPOSE 3000

# Default command is overridden by docker-compose for dev
CMD ["npm", "start"]
