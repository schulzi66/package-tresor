import { Send } from 'express-serve-static-core';

export interface TypedResponse<T> extends Express.Response {
    json: Send<T, this>;
 }