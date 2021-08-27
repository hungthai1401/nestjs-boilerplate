import { User } from '@entity/user.entity';
import { BaseService } from '@module/shared/base.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';

export interface AuthPayload {
  id: number;
  username: string;
  email: string;
}

@Injectable()
export class AuthService extends BaseService<User, AuthRepository> {
  constructor(
    repository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {
    super(repository);
  }

  async attempt(username: string, password: string): Promise<User | null> {
    const user: User = await this.repository.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user?.password))) {
      return null;
    }

    return user;
  }

  generateAccessToken({ id, username, email }: User): string {
    const payload: AuthPayload = {
      id,
      username,
      email,
    };
    return this.jwtService.sign(payload);
  }
}
