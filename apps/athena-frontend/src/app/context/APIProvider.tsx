import { useNotifications } from '@toolpad/core';
import axios from 'axios';
import { UpdateEntity } from './api';
import { APIContext, IAPIClient, CreateEntity, ReadEntity } from './api';
import { AthenaResponse } from 'types/types';

axios.defaults.withCredentials = true;

const API_HOST = 'http://localhost';
const API_PORT = 3000;
const host = `${API_HOST}:${API_PORT}/v1`;

export type Props = {
  children: React.ReactNode;
};

function APIProvider(props: Props) {
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
        {
          headers: { 'content-type': 'multipart/form-data' },
        }
      );
      const data = result.data;
      if (data.error) {
        console.error(`API error: :${data.error}`);
        showError('Unable to upload');
      }
    },
    async create<T extends CreateEntity>(
      path: string,
      entity: T
    ): Promise<void> {
      const result = await axios.post<AthenaResponse>(`${host}${path}`, entity);
      const data = result.data;
      if (data.error) {
        console.error(`API error: :${data.error}`);
        showError('Unable to create');
      }
    },
    async read<T extends ReadEntity>(path: string): Promise<T | null> {
      const result = await axios.get<AthenaResponse<T>>(`${host}${path}`);
      const data = result.data;
      if (data.error) {
        console.error(`API error: :${data.error}`);
        showError('Unable to read');
      }
      return data.data;
    },
    async update<T extends UpdateEntity>(
      path: string,
      entity: T
    ): Promise<void> {
      const result = await axios.put<AthenaResponse>(`${host}${path}`, entity);
      const data = result.data;
      if (data.error) {
        console.error(`API error: :${data.error}`);
        showError('Unable to update');
      }
    },
    async delete(path: string): Promise<void> {
      const result = await axios.delete<AthenaResponse>(`${host}${path}`);
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

export default APIProvider;
