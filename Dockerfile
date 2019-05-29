FROM cypress/base

WORKDIR /usr/app
COPY . .

RUN npm ci

CMD ["npm", "start"]