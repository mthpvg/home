FROM node:12-slim

RUN mkdir /opt/cloud && chown node:node /opt/cloud
WORKDIR /opt/cloud

USER node

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080
EXPOSE 8081

ENV NODE_ENV production

CMD [ "node", "api.js" ]
