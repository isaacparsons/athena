"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthenaResponseBuilder = exports.formatResponseError = exports.formatResponseSuccess = void 0;
const formatResponseSuccess = (data) => {
    return new AthenaResponseBuilder().setData(data).build();
};
exports.formatResponseSuccess = formatResponseSuccess;
const formatResponseError = (error) => {
    return new AthenaResponseBuilder().setError(error).build();
};
exports.formatResponseError = formatResponseError;
class AthenaResponseBuilder {
    constructor() {
        this.response = {
            data: null,
            error: null,
        };
    }
    setData(data) {
        this.response.data = data;
        return this;
    }
    setError(error) {
        this.response.error = error;
        return this;
    }
    build() {
        return this.response;
    }
}
exports.AthenaResponseBuilder = AthenaResponseBuilder;
//# sourceMappingURL=response-format.js.map