# 3615Tube with boilerplate TypeScript_Express_GraphQl_base_API frpm @vlecoq-v

# Main Tutorial for this project

https://medium.com/@th.guibert/basic-apollo-express-graphql-api-with-typescript-2ee021dea2c

# What is GraphQL and how to set it up

We set up a server that we will call to do our queries for us
general guidelines I used - https://medium.com/@chathuranga94/introduction-to-graphql-3e0142879aba
mode detailed - https://www.youtube.com/watch?v=YFkJGEefgU8

# Install Mongo locally :

# --> install mongo

brew tap mongodb/brew
brew install mongodb-community

# --> setup for 42 computers

(Usually we put mongodb info in /data/db but no access in 42)
mkdir -p ~/data/db
vim ~/.brew/etc/mongod.conf --> modify the dbpath from "vim ~/.brew/etc/mongod.conf" to "~/data/db"
you can now run mongo to start cli
