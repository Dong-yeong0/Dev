FROM node:18.13.0-alpine

RUN mkdir /frontend
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install --no-cache
#RUN apk add --no-cache git

CMD ["npm", "run", "build"]
