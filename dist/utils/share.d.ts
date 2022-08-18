export declare const assertDir: (dirPath: string) => void;
export declare const assertFile: (filePath: string) => void;
export declare function compose(...args: Function[]): (this: any, ...executeArgs: any[]) => any;
export declare function asyncCompose(...args: Function[]): (() => void) | ((this: any, ...executeArgs: any[]) => Promise<any>);
