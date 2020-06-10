import UserService from "#root/adapters/UsersService";

const deleteUserSessionResolver = async (obj, { sessionId }, context) => {
  await UserService.deleteUserSession({ sessionId });

  context.res.clearCookie("userSessionId");

  return true;
}

export default deleteUserSessionResolver;