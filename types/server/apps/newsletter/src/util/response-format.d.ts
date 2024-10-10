export declare const formatResponseSuccess: <T>(data: T) => AthenaResponse<T>;
export declare const formatResponseError: <T>(error: Error) => AthenaResponse<T>;
export interface AthenaResponse<T = undefined> {
    data: null | T;
    error: null | Error;
}
export declare class AthenaResponseBuilder<T = undefined> {
    response: AthenaResponse<T>;
    setData(data: T): this;
    setError(error: Error): this;
    build(): AthenaResponse<T>;
}
