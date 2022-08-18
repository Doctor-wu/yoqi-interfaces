import { tenonAppType } from "../core/app.interface";
import { BaseModule } from "./baseModule";
export declare class ConnectionModule extends BaseModule {
    init(app: tenonAppType): void;
    private initBodyParser;
    private initSession;
    private initStatic;
    private initCors;
}
