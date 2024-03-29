import { Auth } from '@decorator/auth.decorator';
import { User } from '@entity/user.entity';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { Request } from './interfaces/request.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request) {
    return {
      accessToken: await this.service.generateAccessToken(req.user),
    };
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async me(@Auth() auth: User) {
    const user = plainToClass(User, await this.service.findById(auth.id));
    return {
      user,
      auth,
    };
  }
}
