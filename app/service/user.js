'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 通过用户名查询用户信息
  async getUserByName(username) {
    try {
      return await this.app.mysql.get('user', { username });
    } catch (error) {
      console.log('error: ', error);
      return null;
    }
  }

  // 注册
  async register(params) {
    try {
      return await this.app.mysql.insert('user', params);
    } catch (error) {
      console.log('error: ', error);
      return null;
    }
  }
}
module.exports = UserService;
