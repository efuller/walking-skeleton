export interface DbConnection<T> {
  getClient(): T;
  disconnect(): Promise<void>;
}