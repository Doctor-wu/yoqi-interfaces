import { BaseController, Controller, Get, Post, RequestContext, RequestNext } from '../tenon-node-framework';
import { execSync } from 'child_process';
import path from 'path';

@Controller({
  prefixPath: '/hook',
  name: 'webhook',
})
export class WebHookController extends BaseController {

  @Post('/attach')
  async handleRequest(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    execSync('npm run build', {
      cwd: '/www/node-services/yoqi-interfaces',
    });
  }
}