# Step 1: Build Vite app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Temporarily switch back to root to force the build
# This is a less secure but reliable fix
USER root 
RUN npm run build
# Switch to a non-root user for the final image if needed
USER node 

# Step 2: Serve with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]