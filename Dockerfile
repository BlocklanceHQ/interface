FROM node:20.10
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . .

EXPOSE 3000

CMD ["yarn", "build", "&&", "yarn", "start"]
