# stage 1 building the code
FROM node
# RUN curl -o- -L https://yarnpkg.com/install.sh | \  bash -s -- --version 0.26.1
# RUN yarn global add nodemon@1.11.0
WORKDIR /usr/app
# COPY ge*.json ./
# RUN yarn install
# COPY ../../node_modules ./
# COPY ../common ./
COPY . .
CMD ["yarn", "start"]
