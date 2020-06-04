import UserService from "#root/adapters/UsersService";

const createUserResolver = async (obj, { email, password}) => {
  return await UserService.createUser({ email, password });
}

export default createUserResolver;