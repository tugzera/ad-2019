FROM node:12.4.0-alpine

RUN mkdir -p /home/node/backend/node_modules/ && chown -R node:node /home/node/backend

WORKDIR /home/node/backend/

COPY --chown=node:node . .

USER node

RUN npm install -qy

EXPOSE 3333

CMD ["npm", "run", "start"]