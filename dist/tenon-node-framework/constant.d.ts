export declare const CONSTANT: {
    defaultServerName: string;
    defaultServerAddress: string;
    defaultSessionConfig: {
        key: string;
        maxAge: number;
        httponly: boolean;
        signed: boolean;
        renew: boolean;
        /** cookie快过期时自动重新设置*/
        sameSite: string;
    };
    defaultCorsConfig: {
        credentials: boolean;
    };
};
