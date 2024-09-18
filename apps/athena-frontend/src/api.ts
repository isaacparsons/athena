import axios from 'axios';
import { Newsletter, AthenaResponse } from 'types/types';

const API_HOST = 'http://localhost';
const API_PORT = 3000;
const path = `${API_HOST}:${API_PORT}`;

// axios.defaults.withCredentials = true

const users = {
  async getMe() {
    const result = await axios.get(`${path}/v1/users/me`, {
      withCredentials: true,
    });
    return result.data;
  },
};

const newsletters = {
  async getMyNewsletters(): Promise<Newsletter[]> {
    const result = await axios.get<AthenaResponse<Newsletter[]>>(
      `${path}/v1/newsletters`,
      {
        withCredentials: true,
      }
    );

    return result.data.data ?? [];
  },
  async getNewsletterById(id: number): Promise<{ data: any }> {
    const result = await axios.get(`${path}/v1/newsletters/${id}`, {
      withCredentials: true,
    });
    return result.data;
  },
};

export const api = {
  users,
  newsletters,
};
