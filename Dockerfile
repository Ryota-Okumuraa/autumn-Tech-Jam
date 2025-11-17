FROM node:22
WORKDIR /app
COPY . .
WORKDIR /app/next-app
RUN npm install
CMD [ "npm", "run", "dev" ]