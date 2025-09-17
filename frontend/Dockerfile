# Stage 1: Build the frontend
FROM node:20-alpine AS build   # Use Node 20+ because Vite requires it
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Run the build as root (avoid vite permission denied)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
