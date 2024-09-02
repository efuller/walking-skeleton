import request from 'supertest';
import { Server } from 'http';
import { ApiResponse } from '@efuller/shared/src/api';

export class RestApiDriver {
  constructor(private http: Server) {}

  async get<Result>(path: string, headers: Record<string, string> = {}): Promise<ApiResponse<Result>> {
    try {
      const response = await request(this.http).get(path).set(headers);
      return response.body;
  } catch (error) {
      return {
        success: false,
        data: undefined,
        error: error as Error
      } as ApiResponse<Result>;
    }
  }

  async post<ApiRequest extends object, TData>(path: string, data: ApiRequest, headers: Record<string, string> = {}): Promise<ApiResponse<TData>> {
    try {
      const response =  await request(this.http)
        .post(path)
        .set('Accept', 'application/json')
        .set(headers)
        .send(data);

      return response.body;
    } catch (error) {
      return {
        success: false,
        data: undefined,
        error: error as Error,
      } as ApiResponse<TData>;
    }
  }
}