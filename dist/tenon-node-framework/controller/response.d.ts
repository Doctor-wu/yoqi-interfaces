export declare const createResponseJson: (data: any) => {
    code: number;
    success: boolean;
    successText: string;
    data: any;
};
export declare const createErrorJson: (errorCode: number, errorMsg: string) => {
    code: number;
    success: boolean;
    errorMsg: string;
};
