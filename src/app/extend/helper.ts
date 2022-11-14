// import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
// import * as meeko from 'meeko';

moment.locale('zh-hk');

module.exports = {
  success(result = null, message, status = 200) {
    if (message) {
      this.ctx.body = {
        result: result,
        message,
      };
    } else {
      this.ctx.body = {
        result: result,
      };
    }
    this.ctx.status = status;
  },
  error(err = null, message, status = 200) {
    if (message) {
      this.ctx.body = {
        error: err,
        message,
      };
    } else {
      this.ctx.body = {
        error: err,
      };
    }
    this.ctx.status = status;
  },
};

export default {};
