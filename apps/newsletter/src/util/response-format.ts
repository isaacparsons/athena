export const formatResponseSuccess = <T>(data: T) => {
  return new AthenaResponseBuilder<T>().setData(data).build();
};

export const formatResponseError = <T>(error: Error) => {
  return new AthenaResponseBuilder<T>().setError(error).build();
};

export interface AthenaResponse<T = undefined> {
  data: null | T;
  error: null | Error;
}

export class AthenaResponseBuilder<T = undefined> {
  response: AthenaResponse<T> = {
    data: null,
    error: null,
  };

  setData(data: T) {
    this.response.data = data;
    return this;
  }

  setError(error: Error) {
    this.response.error = error;
    return this;
  }

  build(): AthenaResponse<T> {
    return this.response;
  }
}
