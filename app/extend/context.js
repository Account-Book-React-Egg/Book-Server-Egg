module.exports = {
  success(message = 'success', data) {
    this.body = {
      code: 200,
      message,
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
