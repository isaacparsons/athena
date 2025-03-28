FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY dist/apps ./dist
COPY config ./config
EXPOSE 3000
EXPOSE 4200
CMD ["node", "./dist/newsletter/main.js"]