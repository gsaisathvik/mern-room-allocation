# Step 1: Build Vite app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN su -c "npm run build" node
# The line above is a change
# You can remove the "USER node" line if you want, but it won't hurt
# to keep it there.

# Step 2: Serve with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]