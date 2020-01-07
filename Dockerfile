FROM cypress/base:10.18.0

WORKDIR /usr/app

COPY package.json package-lock.json /usr/app/
RUN npm ci

COPY . .

CMD ["node_modules/.bin/ts-node", "index.ts"]
