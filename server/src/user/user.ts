interface user {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
  id: string;
  picture: string;
}

const buildCreateUser = ({}: any) => {
  return function createUser(user: user) {
    const { firstName, lastName, email, login, password, id, picture } = user;
    if (user.firstName.length < 2)
      throw new Error("users must have a valid firstName");
    return Object.freeze({
      getFirstName: (): string => firstName,
      getId: (): string => id
    });
  };
};

export { buildCreateUser, user };
