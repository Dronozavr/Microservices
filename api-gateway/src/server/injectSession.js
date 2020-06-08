import UsersService from "#root/adapters/UsersService";
const injectSession = async (req, res, next) => {
  if (req.cookies.userSessionId) {
    let userSession;
    try {
      userSession = await UsersService.fetchUserSession({
        sessionId: req.cookies.userSessionId
      });
    } catch (e) {
      return next(e);
    }
    res.locals.userSession = userSession;
  }

  return next();
};

export default injectSession;

