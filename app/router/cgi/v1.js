module.exports = app => {
  const {
    controller,
    router,
    //   middleware: { auth, inProject, cgiSignCheck, validateUser },
  } = app;

  const v1 = router.namespace('/cgi/v1');

  v1.post('/register', controller.user.register);
  v1.post('/login', controller.user.login);
};
