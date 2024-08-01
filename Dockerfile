FROM node:18

RUN mkdir /ec_frontend

WORKDIR /ec_frontend

COPY ./package.json /ec_frontend

RUN npm install

RUN npm install @aws-sdk/client-s3
COPY . /ec_frontend

#RUN npm run build

CMD ["npm", "start"]
