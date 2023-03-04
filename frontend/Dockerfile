FROM node:16.15-alpine
WORKDIR /usr/src/app/frontend
COPY package*.json ./
RUN yarn install && yarn cache clean
EXPOSE 3000
CMD ["yarn", "start"]