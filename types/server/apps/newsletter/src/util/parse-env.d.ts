export declare function parseEnv(): {
    app: {
        host: string;
        port: number;
        sessionSecret: string;
        sessionCookieName: string;
        adminSecret: string | undefined;
    };
    db: {
        host: string;
        port: number;
        name: string;
        username: string;
        password: string;
    };
    google: {
        clientId: string;
        clientSecret: string;
        callbackUrl: string;
    };
    gcs: {
        bucketName: string;
    };
    client: {
        host: string;
        port: number;
    };
};
