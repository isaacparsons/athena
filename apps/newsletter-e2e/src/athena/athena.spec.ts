import axios from 'axios';
import { trpcTestClient } from '../setup';

const apiUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

describe('GET /health', () => {
  it('should return a message', async () => {
    trpcTestClient;
    const res = await axios.get(apiUrl);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ status: 'OK' });
  });
});
