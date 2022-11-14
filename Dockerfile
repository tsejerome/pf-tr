FROM node:14

WORKDIR /home

COPY . .

RUN npm i --save

RUN npm run build

EXPOSE 7001

CMD ["npm", "run", "production"]
