FROM node:12.4.0-alpine

RUN mkdir -p /home/node/frontend/

WORKDIR /home/node/frontend/

COPY . .

RUN rm -rf node_modules/

RUN npm install -qy

EXPOSE 3000

CMD ["npm", "run", "start"]