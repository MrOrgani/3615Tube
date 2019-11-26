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
  @Field() verified: boolean;
}

const buildCreateUser = ({ uuid }: any) => {
  return function createUser(user: User) {
    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   login,
    //   password,
    //   picture,
    //   verified
    // } = user;
    user.id = uuid.makeUuid();
    console.log("in entity user, newUuid : ", id);

    if (user.firstName.length < 2)
      throw new Error("users must have a valid firstName");
    if (user.lastName.length < 2)
      throw new Error("users must have a valid firstName");
    if (user.email.length < 2)
      throw new Error("users must have a valid firstName");
    if (user.login.length < 2)
      throw new Error("users must have a valid firstName");
    if (user.password.length < 2)
      throw new Error("users must have a valid firstName");
    return user;

    // return Object.freeze({
    //   getFirstName: (): string => firstName,
    //   getLastName: (): string => lastName,
    //   getemail: (): string => email,
    //   getLogin: (): string => login,
    //   getPassword: (): string => password,
    //   getUuid: (): string => id,
    //   getPicture: (): string => picture
    // });
  };
};

export { buildCreateUser, User };
