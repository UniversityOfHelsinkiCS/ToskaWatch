FROM 'node'

WORKDIR /usr/app
COPY . .

RUN npm install
EXPOSE 6784

CMD ["npm", "start"]