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
}
module.exports = UserController;
