import { tenonAppType } from "../core/app.interface";
import { BaseModule } from "./baseModule";
export declare class LogModule extends BaseModule {
    private logQueue;
    private warnQueue;
    private errorQueue;
    init(app: tenonAppType): void;
    private setupLogger;
    private initIOObserver;
    createTask(filePath: string, msg: string[]): () => Promise<unknown>;
}
