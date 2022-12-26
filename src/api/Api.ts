import Axios, { AxiosRequestHeaders } from 'axios';

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch',
  path: string,
  input?: D,
  options?: {
    headers?: AxiosRequestHeaders;
    external?: boolean;
  },
) {
  try {
    const res = await Axios.request<R>({
      url: options?.external ? path : `${process.env.API_URL}/${path}`,
      method: method,
      data: input,
      headers: options?.headers,
      withCredentials: true,
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Error message: error.response.data.message
    return error.response ? error.response.data ?? error.response.data : error;
  }
}

export * from './User';
