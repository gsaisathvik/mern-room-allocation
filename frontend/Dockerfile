# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend (run as root)
RUN npm run build

# Use non-root user for security at runtime
USER node

# Expose port
EXPOSE 80

# Start frontend (use Vite preview or serve dist)
CMD ["npx", "vite", "preview", "--host", "--port", "80"]
