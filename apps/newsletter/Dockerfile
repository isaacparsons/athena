FROM node:18
WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
COPY dist/apps ./dist
# COPY apps/newsletter/resources ./dist/newsletter/resources
COPY config ./config
WORKDIR /usr/src/app/dist/newsletter
RUN npm install
WORKDIR /usr/src/app
EXPOSE 3000
EXPOSE 4200
CMD ["node", "./dist/newsletter/main.js"]