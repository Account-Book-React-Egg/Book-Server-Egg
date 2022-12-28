'use strict';

const { Controller } = require('egg');

const defaultAvatar =
  'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';

class UserController extends Controller {
  async register() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;

    // 非空判断
    if (!username || !password) {
      return ctx.error('账号或密码不能为空', 401);
    }

    // 用户名重复
    const userInfo = await service.user.getUserByName(username);
    if (userInfo && userInfo.userId) {
      return ctx.error('账户名已被注册，请重新输入', 401);
    }

    // 注册
    const result = await service.user.register({
      username,
      password,
      signature: '世界和平。',
      avatar: defaultAvatar,
      createTime: new Date(),
    });
    if (result) ctx.success('注册成功');
    ctx.error('注册失败');
  }

  async login() {
    const { ctx, service, app } = this;
    const { username, password } = ctx.request.body;

    // 根据用户名，查找该用户
    const userInfo = await service.user.getUserByName(username);
    if (!userInfo || !userInfo.userId) {
      return ctx.error('账号不存在', 401);
    }

    // 核对账户密码
    if (userInfo && password !== userInfo.password) {
      return ctx.error('账号密码错误', 401);
    }

    // 为该用户生成 token
    const token = app.jwt.sign(
      {
        id: userInfo.id,
        username: userInfo.username,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // token 有效期为 24 小时
      },
      app.config.jwt.secret
    );
    ctx.success('登录成功', { jwtToken: 'Bearer ' + token });
  }

  async test() {
    this.ctx.success('token 校验成功');
  }
}
module.exports = UserController;
