FROM node:18.13.0-alpine

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install --no-cache
RUN npm install -g nodemon

COPY . /app
CMD ["npm", "run", "server"]
