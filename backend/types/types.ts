import { Request } from 'express';
import { IUser } from '../models/user.model';

export interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
  user?: Partial<IUser> | null;
}
