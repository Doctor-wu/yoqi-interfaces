import { BaseController, Controller, Get, Post, RequestContext, RequestNext } from '../tenon-node-framework';

@Controller({
  prefixPath: '/form',
  name: 'form',
})
export class FormController extends BaseController {

  @Get('/get', {
    params: {
      id: {
        type: 'string',
        required: true,
      },
    }
  })
  @Post('/post', {
    params: {
      name: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'string',
        required: true,
      },
  }})
  async handleRequest(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    return this.responseJson(ctx, next)(`收到你的请求啦，请求方法为${ctx.request.method}，请求参数为${JSON.stringify(params)}`);
  }
}