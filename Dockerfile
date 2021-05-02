FROM node:10

LABEL maintainer="Ram Sevak Mishra <ramsevakmishra69@gmail.com>"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 5000

COPY . .
RUN npm install
CMD ["npm", "run", "start"]