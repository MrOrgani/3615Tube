import { Field, ObjectType, ID } from "type-graphql";
//to avoid defining multiple times graphql typedefs and TS Interfaces
//https://typegraphql.ml/docs/types-and-fields.html

@ObjectType()
class User {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  login: string;

  @Field()
  password: string;

  @Field()
  id: string;

  @Field()
  picture: string;

  @Field()
  verified: boolean;
}

const buildCreateUser = ({}: any) => {
  return function createUser(user: User) {
    const { firstName, lastName, email, login, password, id, picture } = user;
    if (user.firstName.length < 2)
      throw new Error("users must have a valid firstName");
    // if (user.password.length < 2)
    // throw new Error
    return Object.freeze({
      getFirstName: (): string => firstName,
      getId: (): string => id
    });
  };
};

export { buildCreateUser, User };
