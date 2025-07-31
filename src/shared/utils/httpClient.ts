import { FetchConfig } from '../types/http';

export const httpClient = {
  async request<T = unknown>(url: string, config: FetchConfig = {}): Promise<T> {
    const { method = 'GET', headers = {}, body } = config;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async get<T = unknown>(url: string, config?: Omit<FetchConfig, 'method'>): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  },

  async post<T = unknown>(url: string, config?: Omit<FetchConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(url, { ...config, method: 'POST' });
  },

  async put<T = unknown>(url: string, config?: Omit<FetchConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PUT' });
  },

  async delete<T = unknown>(url: string, config?: Omit<FetchConfig, 'method'>): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  },

  async patch<T = unknown>(
    url: string,
    body?: unknown,
    config?: Omit<FetchConfig, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PATCH', body });
  },

  async safeRequest(url: string, config: FetchConfig = {}): Promise<Response> {
    const { method = 'GET', headers = {}, body } = config;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return response;
  },

  async safeGet(url: string, config?: Omit<FetchConfig, 'method'>): Promise<Response> {
    return this.safeRequest(url, { ...config, method: 'GET' });
  },
};
