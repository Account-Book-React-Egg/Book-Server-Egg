module.exports = app => {
  const {
    controller,
    router,
    middleware: { validateToken },
  } = app;

  const v1 = router.namespace('/cgi/v1', validateToken(app.config.jwt.secret));

  v1.post('/test', controller.user.test);
};
