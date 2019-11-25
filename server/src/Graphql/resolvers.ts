import { IResolvers } from "graphql-tools";
import User from "../models/userModel";

const resolvers: IResolvers = {
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
    createUser: async (_: void, args: { firstName: string }) => {
      console.log(args.firstName);
      const newPlayer = new User(args);
      // newPlayer.id = newPlayer._id;
      console.log(newPlayer);
      await newPlayer.save();
      console.log("salut", newPlayer.firstName, "Kiff Nik la bese ?");
      return newPlayer;
      //   return args;
    }
  }
};

export default resolvers;
