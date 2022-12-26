// app/service/user.js
const Service = require('egg').Service;

class MysqlService extends Service {
  async query() {
    const QUERY_STR = 'id, name';
    const sql = `select ${QUERY_STR} from list`; // 获取 id 的 sql 语句
    try {
      const result = await this.app.mysql.query(sql); // mysql 实例已经挂载到 app 对象下，可以通过 app.mysql 获取到。
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(payload) {
    try {
      return await this.app.mysql.insert('list', payload); // 给 list 表，新增一条数据
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(id, name) {
    try {
      return await this.app.mysql.update('list', { name }, { where: { id } });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id) {
    try {
      return await this.app.mysql.delete('list', { id });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = MysqlService;
