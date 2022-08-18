export declare class Subscribe {
    private events;
    on(eventName: string, handler: Function): void;
    once(eventName: string, handler: Function): void;
    cancel(eventName: string, cancelHandler: Function): void;
    emit(eventName: string, ...payloads: any[]): void;
}
