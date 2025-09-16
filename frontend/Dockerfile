# Step 1: Build Vite app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

# Fix permissions and rebuild
USER node
RUN mkdir /home/node/.npm && chown node:node /home/node/.npm
COPY --chown=node:node . /home/node/app
WORKDIR /home/node/app
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /home/node/app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]