// token 校验
module.exports = secret => async (ctx, next) => {
  const token = ctx.request.header.authorization;
  if (!token) return ctx.error('No Login.', 401);
  try {
    const userInfo = ctx.app.jwt.verify(token.replace(/Bearer /, ''), secret);
    if (userInfo) await next();
  } catch (error) {
    return ctx.error('Invalid Token', 401);
  }
};
