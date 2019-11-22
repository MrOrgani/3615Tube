import { IResolvers } from "graphql-tools";
import User from "../models/userModel";

const resolverMap: IResolvers = {
  Query: {
    helloWorld: (_: void, args: void): string => {
      return `👋 Hello world! 👋`;
    },
    users: async () => {
      const usersList = await User.find();
      console.log("userList", usersList);
      return usersList;
    }
  },
  Mutation: {
    createUser: async (_: void, args: { name: string }) => {
      console.log(args.name);
      const newPlayer = new User(args);
      // newPlayer.id = newPlayer._id;
      console.log(newPlayer);
      await newPlayer.save();
      console.log("salut", newPlayer.name, "Kiff Nik la bese ?");
      return newPlayer;
      //   return args;
    }
  }
};

export default resolverMap;
