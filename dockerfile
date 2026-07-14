FROM node:20-alpine AS builder
# Update Alpine packages
RUN apk update && apk upgrade
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

FROM node:20-alpine
# Update Alpine packages in final image too
RUN apk update && apk upgrade
WORKDIR /usr/src/app
# Copy the node_modules from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copy only the necessary files for production
COPY index.js ./
COPY getData.js ./
COPY package.json ./
# (Do not copy package-lock.json or dev folders)

# Upgrade global npm to fix vulnerabilities in the base image's npm installation
RUN npm install -g npm@latest

EXPOSE 3000
CMD ["npm", "start"]