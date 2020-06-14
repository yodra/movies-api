FROM node:14.4.0 as trasnpiledApi
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Deploy
FROM node:14.4.0
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY --from=trasnpiledApi /usr/src/app/dist .

EXPOSE 3000
CMD ["node", "server.js"]
