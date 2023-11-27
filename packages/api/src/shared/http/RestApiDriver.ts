import request from 'supertest';
import { Server } from 'http';

export class RestApiDriver {
  constructor(private http: Server) {}

  get(path: string) {
    const response =  request(this.http).get(path);
    return response;
  }
}