FROM node:22
WORKDIR /app
COPY next-app/package.json ./next-app/package.json
WORKDIR /app/next-app
RUN npm install
CMD [ "npm", "run", "dev"]