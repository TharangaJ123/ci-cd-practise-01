FROM node:20-alpine

# Update Alpine packages
RUN apk update && apk upgrade

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]