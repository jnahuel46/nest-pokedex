export interface HttpAdapter {
  //<T> it is a generic type to return the data of the response
  get<T>(url: string): Promise<T>;
}
