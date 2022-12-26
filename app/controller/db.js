'use strict';

const { Controller } = require('egg');

class MysqlController extends Controller {
  async index() {
    const { ctx, service } = this;
    const result = await service.db.query();
    ctx.body = result;
  }

  async create() {
    const { ctx, service } = this;
    try {
      await service.db.create(ctx.request.body);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '添加失败',
        data: null,
      };
    }
  }

  async update() {
    const { ctx, service } = this;
    try {
      await service.db.update(ctx.params.id, ctx.request.body.name);
      ctx.body = {
        code: 200,
        msg: '编辑成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        msg: '编辑失败',
        data: null,
      };
    }
  }

  async destroy() {
    const { ctx } = this;
    try {
      await ctx.service.db.delete(ctx.params.id);
      ctx.body = {
        code: 200,
        msg: '删除成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '删除失败',
        data: null,
      };
    }
  }

  async new() {
    const { ctx } = this;
    ctx.body = 'new mysql';
  }
}

module.exports = MysqlController;
