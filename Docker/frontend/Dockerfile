FROM node:18.13.0-alpine

RUN mkdir /frontend
RUN chmod 755 /frontend
WORKDIR /frontend
COPY package*.json /frontend/package.json

RUN npm install --force
COPY . /frontend/
CMD [ "npm", "run", "build" ]
