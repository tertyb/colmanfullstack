FROM node:18

WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ ./
RUN npm run build


EXPOSE 3000
CMD ["node", "./dist/server.js"]
