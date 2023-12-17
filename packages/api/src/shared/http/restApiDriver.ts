import request from 'supertest';
import { Server } from 'http';

export class RestApiDriver {
  constructor(private http: Server) {}

  get(path: string) {
    const response =  request('https://walking-skeleton-api.onrender.com').get(path);
    return response;
  }

  post(path: string, data: Record<string, any>) {
    const response =  request('https://walking-skeleton-api.onrender.com').post(path).set('Accept', 'application/json').send(data);
    return response;
  }
}