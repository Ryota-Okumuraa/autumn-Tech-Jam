FROM node:22
WORKDIR /front

COPY package.json package-lock.json ./
RUN npm install 

COPY . .
CMD ["npm", "run", "dev"]
EXPOSE 3000