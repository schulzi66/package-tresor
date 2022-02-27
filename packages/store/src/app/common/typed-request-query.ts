export interface TypedRequestQuery<T> extends Express.Request {
  query: T;
}
