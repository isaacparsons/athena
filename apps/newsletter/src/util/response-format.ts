import { Newsletter, User } from '../db/tables/index';
export const formatResponseSuccess = <T>(data: T) => {
  return {
    data: data,
  };
};

export const formatResponseError = (title: string) => {
  return {
    error: new Error(title),
  };
};

export interface AthenaResponse<T> {
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
