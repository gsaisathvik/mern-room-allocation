# Step 1: Build Vite app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy source code and change ownership
COPY --chown=node:node . .

# Switch user and run the build
USER node
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]