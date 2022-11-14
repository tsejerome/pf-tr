module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      switch (err.status) {
        case 400:
          ctx.body = { code: 400, message: 'Bad Request' };
          break;
        case 401:
          ctx.body = { code: 401, message: 'Permission denied' };
          break;
        case 403:
          ctx.body = { code: 403, message: 'Request denied' };
          break;
        case 404:
          ctx.body = { code: 404, message: 'Not Found' };
          break;
        case 406:
          ctx.body = { code: 406, message: 'Wrong Request Format' };
          break;
        case 410:
          ctx.body = { code: 410, message: 'Resource Deleted' };
          break;
        case 422:
          ctx.body = { code: 422, message: 'Aeccess Validation Fail' };
          break;
        case 500:
          ctx.body = { code: 500, message: 'Internal Server Error' };
          break;
        case 502:
          ctx.body = { code: 500, message: 'Network Error' };
          break;
        case 503:
          ctx.body = { code: 500, message: 'Server Under maintenance' };
          break;
        case 504:
          ctx.body = { code: 500, message: 'Gateway Time Out' };
          break;
        default:
          ctx.body = { code: 500, message: 'Internal Server Error' };
          break;
      }
    }
  };
};
