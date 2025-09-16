# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Install vite globally to ensure it's available
RUN npm install -g vite

# Copy rest of the code
COPY . .

# Build the frontend
RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built frontend from stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
