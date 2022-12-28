import Axios, { AxiosRequestHeaders } from 'axios';

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch',
  path: string,
  input?: D,
  options?: {
    headers?: AxiosRequestHeaders;
  },
) {
  try {
    const response = await Axios.request<R>({
      baseURL: 'http://localhost:8080',
      url: path,
      method: method,
      data: input,
      headers: options?.headers,
      withCredentials: true,
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Error message: error.response.data.message
    // return error.response ? error.response.data ?? error.response.data : error;
    return error.response;
  }
}

export * from './User';
export * from './Product';
