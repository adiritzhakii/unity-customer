FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV MONGO_URL=mongo:27017
ENV KAFKA_URL=localhost:9092
EXPOSE 3000
CMD ["node", "dist/main"]
