import { HydratedDocument, Model, Schema } from "mongoose";
import { tenonAppType } from "../core/app.interface";
import { IDecoratedServiceExtraFields } from "./service-core.interface";
export declare const initServices: (app: tenonAppType) => void;
export declare class BaseService<DocType = unknown> implements IDecoratedServiceExtraFields<DocType> {
    protected app: tenonAppType;
    /**
     * Service装饰器会为Service在实例化时去创造一个schemaInstance对象
     * */
    protected schemaInstance: Schema;
    /**
     * Service装饰器会为Service在实例化时去创造一个model对象
     * */
    protected model: Model<DocType>;
    /**
     * Service装饰器会为实例加上serviceName属性
     * */
    serviceName: string;
    constructor(app: tenonAppType);
    /** 初始化Model */
    protected buildModel(): void;
    /** 创建一个Model实例 */
    protected createModelInstance(...args: any[]): HydratedDocument<DocType, {}, {}>;
    /**
     * 向数据库中存入一条对应Model的实体数据
     * @param itemInfo Model中一条数据
     * @returns
     */
    protected addItem(itemInfo: any): Promise<any>;
    protected deleteItemById(_id: string): Promise<string>;
    protected deleteManyByIds(ids: string[]): Promise<string>;
    protected updateItemById(_id: string, info: any): Promise<string>;
    protected updateItemByQuery(query: any, info: any): Promise<string>;
    protected errorProtectedHandler(resultGetter: () => Promise<any>): Promise<[any, any]>;
    get Model(): Model<DocType>;
}
