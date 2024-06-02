FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV CUSTOMER_SERVER_URL=customer-manager:3000
ENV KAFKA_URL=kafka1:19092
EXPOSE 3001
CMD ["node", "dist/main"]
