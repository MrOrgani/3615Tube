FROM node
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg |  apt-key add - \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
WORKDIR /usr/app
RUN apt-get update && apt-get install -y yarn zsh vim
RUN yarn global add nodemon@1.11.0 ts-node typescript \
    && sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
COPY . .
RUN yarn install
CMD ["yarn", "start"]