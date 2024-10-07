FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g pm2

RUN npm run build

EXPOSE 8000

# CMD [ "npm", "run", "start:dev"]
CMD ["pm2-runtime", "start", "dist/main.js", "--name", "nestjs-app", "-i", "2"]

# CMD ["pm2", "start", "ecosystem.config.js"]