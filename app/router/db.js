module.exports = app => {
  const { controller, router } = app;
  const dbRouter = router.namespace('/db');

  dbRouter.resources('db', '/sql', controller.db);
};
