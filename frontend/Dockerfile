# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Ensure vite binary is executable
RUN chmod +x node_modules/.bin/vite || true

# Copy rest of the code
COPY . .

# Build the frontend (still as root so vite works)
RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built frontend from stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["npm", "run", "dev"]
