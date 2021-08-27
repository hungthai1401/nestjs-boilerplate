export interface IBaseService<T> {
  store(payload: any): Promise<T>;
}
