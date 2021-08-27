import { User } from '@entity/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
    });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.attempt(username, password);
    if (!user) {
      throw new UnauthorizedException(
        'These credentials do not match our records.',
      );
    }

    return user;
  }
}
