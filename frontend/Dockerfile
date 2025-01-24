# Build the React app
FROM node:18 AS build

WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY frontend/certs /etc/nginx/certs

# Expose port 443 for SSL
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
