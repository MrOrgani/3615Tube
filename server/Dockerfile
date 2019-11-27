# stage 1 building the code
FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
