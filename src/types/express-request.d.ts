import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: {
      sub: string;
      name: string;
      // Add other fields as necessary
    };
  }
}
