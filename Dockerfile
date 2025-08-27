FROM node:22.17.0-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN npm install --legacy-peer-deps
RUN npm cache clean --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]