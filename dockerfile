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

# Remove global npm to eliminate vulnerabilities since it's not needed to run the app
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

EXPOSE 3000
CMD ["node", "index.js"]