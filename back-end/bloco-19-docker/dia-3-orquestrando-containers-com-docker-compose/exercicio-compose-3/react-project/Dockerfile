FROM node

WORKDIR /react-project

COPY package.json .
RUN npm install

COPY . .
ENTRYPOINT [ "npm" ]
CMD [ "start" ]