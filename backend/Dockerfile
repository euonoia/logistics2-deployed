FROM node:18

WORKDIR /app

# Install dependencies first (leveraging Docker cache)
COPY package*.json ./
RUN npm install

# Install nodemon globally for hot reload
RUN npm install -g nodemon

# Copy the rest of the code
COPY . .

# Default command is overridden by docker-compose for dev
CMD ["npm", "start"]
