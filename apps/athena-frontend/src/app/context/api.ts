// import axios from 'axios';
// import { createContext, useContext } from 'react';

// import {
//   CreateEntityInput,
//   UpdateEntityInput,
//   ReadEntity,
//   AthenaResponse,
// } from '../types';

// axios.defaults.withCredentials = true;

// export interface IAPIClient {
//   upload(path: string, formData: FormData): Promise<void>;
//   create<T extends CreateEntityInput>(path: string, entity: T): Promise<void>;
//   read<T extends ReadEntity | ReadEntity[]>(path: string): Promise<T | null>;
//   update<T extends UpdateEntityInput>(path: string, entity: T): Promise<void>;
//   delete(path: string): Promise<void>;
// }
// export class APIClient implements IAPIClient {
//   host: string;
//   constructor(host: string) {
//     this.host = host;
//   }
//   async upload(path: string, formData: FormData): Promise<void> {
//     const result = await axios.post<AthenaResponse>(
//       `${this.host}${path}`,
//       formData,
//       {
//         headers: { 'content-type': 'multipart/form-data' },
//       }
//     );
//     const data = result.data;
//     if (data.error) {
//       throw data.error;
//     }
//   }
//   async create<T extends CreateEntityInput>(
//     path: string,
//     entity: T
//   ): Promise<void> {
//     const result = await axios.post<AthenaResponse>(
//       `${this.host}${path}`,
//       entity
//     );
//     const data = result.data;
//     if (data.error) {
//       throw data.error;
//     }
//   }
//   async read<T extends ReadEntity | ReadEntity[]>(
//     path: string
//   ): Promise<T | null> {
//     const result = await axios.get<AthenaResponse<T>>(`${this.host}${path}`);
//     const data = result.data;
//     if (data.error) {
//       throw data.error;
//     }
//     return data.data;
//   }
//   async update<T extends UpdateEntityInput>(
//     path: string,
//     entity: T
//   ): Promise<void> {
//     const result = await axios.put<AthenaResponse>(
//       `${this.host}${path}`,
//       entity
//     );
//     const data = result.data;
//     if (data.error) {
//       throw data.error;
//     }
//   }
//   async delete(path: string): Promise<void> {
//     const result = await axios.delete<AthenaResponse>(`${this.host}${path}`);
//     const data = result.data;
//     if (data.error) {
//       throw data.error;
//     }
//   }
// }

// const API_HOST = 'http://localhost';
// const API_PORT = 3000;
// const path = `${API_HOST}:${API_PORT}/v1`;

// export const apiClient = new APIClient(path);

// export const APIContext = createContext<IAPIClient>(apiClient);

// export const useAPI = () => {
//   return useContext(APIContext);
// };
