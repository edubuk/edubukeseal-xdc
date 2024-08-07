FROM node:18

RUN mkdir /ec_backend

WORKDIR /ec_backend

COPY ./package.json /ec_backend

RUN npm i -force

RUN npm install @aws-sdk/client-s3
COPY . /ec_backend

ENV AWS_KEY='CC4943D384E226A7C338'
ENV AWS_SECRET='ArF1IVYF7rm4OqfcVuB2shDtlEbFuRJkR9LKtxC4'
ENV SMART_CONTRACT='0x7B29389a13a2a2443581B511bfD3386eaC175802'
ENV PRIVATE_KEY='0xe8e1afe6fe58acd52072e33e62c9c29ac727e99da3e01532cf68bb8830aaa461'   
ENV RPC_URL='https://earpc.xinfin.network'

EXPOSE 3001

CMD ["npm", "start"]
