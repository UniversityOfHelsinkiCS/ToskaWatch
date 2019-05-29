FROM cypress/base

WORKDIR /usr/app
COPY . .

RUN npm ci

EXPOSE 6784

CMD ["npm", "start"]