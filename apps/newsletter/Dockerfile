FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY ../../dist/apps/newsletter ./dist
EXPOSE 3000
CMD ["node", "./dist/index.js"]