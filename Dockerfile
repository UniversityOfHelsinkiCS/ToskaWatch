FROM cypress/base

WORKDIR /usr/app
COPY . .

RUN npm ci

CMD ["node_modules/.bin/ts-node", "index.ts"]
