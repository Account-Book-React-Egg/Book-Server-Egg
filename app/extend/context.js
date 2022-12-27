module.exports = {
  success(data) {
    this.body = {
      code: 200,
      message: 'success',
      data,
    };
  },

  error(err = 'Internal Server Error', code = 500, data = null) {
    this.status = code;
    this.body = {
      code,
      message: err,
      data,
    };
  },
};
