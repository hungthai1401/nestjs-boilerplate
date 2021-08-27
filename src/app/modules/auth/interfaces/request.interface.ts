import { User } from '@entity/user.entity';

export interface Request {
  user: User | null;
}
