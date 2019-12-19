FROM node
WORKDIR /usr/app
COPY . .
RUN yarn install
# yarn install is not really needed as we have a volume but juste in case
CMD ["yarn", "start"]