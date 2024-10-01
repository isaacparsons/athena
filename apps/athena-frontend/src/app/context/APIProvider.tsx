import { useNotifications } from '@toolpad/core';
import axios from 'axios';
import { APIContext, IAPIClient } from './index';
import {
  CreateEntityInput,
  AthenaResponse,
  UpdateEntityInput,
  ReadEntity,
} from '../types';

axios.defaults.withCredentials = true;

const API_HOST = 'http://localhost';
const API_PORT = 3000;
const host = `${API_HOST}:${API_PORT}/v1`;

const devHeaders = {
  'admin-secret': '123456',
};

const createRequestConfig = (config?: { headers?: object }) => {
  return {
    headers: {
      ...config?.headers,
      ...devHeaders,
    },
  };
};

export type APIProviderProps = {
  children: React.ReactNode;
};

export function APIProvider(props: APIProviderProps) {
  const { children } = props;
  const notifications = useNotifications();

  const showError = (msg: string) => {
    notifications.show(msg, {
      autoHideDuration: 3000,
      severity: 'error',
    });
  };

  const wrappedApiClient: IAPIClient = {
    async upload(path: string, formData: FormData): Promise<void> {
      const result = await axios.post<AthenaResponse>(
        `${host}${path}`,
        formData,
        createRequestConfig({
          headers: { 'content-type': 'multipart/form-data' },
        })
      );
      const data = result.data;
      if (data.error) {
        console.error(`API error: :${data.error}`);
        showError('Unable to upload');
      }
    },
    async create<T extends CreateEntityInput>(
      path: string,
      entity: T
    ): Promise<void> {
      const result = await axios.post<AthenaResponse>(
        `${host}${path}`,
        entity,
        createRequestConfig()
      );
      const data = result.data;
      if (data.error) {
        console.error(`API error: :${data.error}`);
        showError('Unable to create');
      }
    },
    async read<T extends ReadEntity | ReadEntity[]>(
      path: string
    ): Promise<T | null> {
      const result = await axios.get<AthenaResponse<T>>(
        `${host}${path}`,
        createRequestConfig()
      );
      const data = result.data;
      if (data.error) {
        console.error(`API error: :${data.error}`);
        showError('Unable to read');
      }
      return data.data;
    },
    async update<T extends UpdateEntityInput>(
      path: string,
      entity: T
    ): Promise<void> {
      const result = await axios.put<AthenaResponse>(
        `${host}${path}`,
        entity,
        createRequestConfig()
      );
      const data = result.data;
      if (data.error) {
        console.error(`API error: :${data.error}`);
        showError('Unable to update');
      }
    },
    async delete(path: string): Promise<void> {
      const result = await axios.delete<AthenaResponse>(
        `${host}${path}`,
        createRequestConfig()
      );
      const data = result.data;
      if (data.error) {
        console.error(`API error: :${data.error}`);
        showError('Unable to delete');
      }
    },
  };

  return (
    <APIContext.Provider value={wrappedApiClient}>
      {children}
    </APIContext.Provider>
  );
}
