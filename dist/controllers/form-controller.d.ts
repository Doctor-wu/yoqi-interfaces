import { BaseController, RequestContext, RequestNext } from '../tenon-node-framework';
export declare class FormController extends BaseController {
    handleRequest(ctx: RequestContext, next: RequestNext, params: any): Promise<void>;
}
