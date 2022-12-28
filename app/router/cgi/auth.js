module.exports = app => {
  const { controller, router } = app;

  const auth = router.namespace('/cgi/auth');

  auth.post('/register', controller.user.register);
  auth.post('/login', controller.user.login);
};
