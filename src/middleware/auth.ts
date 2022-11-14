import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';

@Provide()
export class AuthSetupMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      /*
       * TODO: Setup a scalable authentication system
       * Wrong use of bearer token above
       */
      if (!ctx.headers.authorization) {
        ctx.state.userId = null;
        await next();
        return;
      }
      ctx.state.userId = ctx.headers.authorization.split('Bearer ')[1];
      await next();
    };
  }
}
