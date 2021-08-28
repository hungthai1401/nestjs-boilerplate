import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { User } from '@entity/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AddParamsToBody } from '@decorator/add-params-to-body.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async index(): Promise<User[]> {
    return plainToClass(User, await this.service.findAll());
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return plainToClass(User, await this.service.findOrFailById(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDTO): Promise<User> {
    return plainToClass(User, await this.service.store(payload));
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @AddParamsToBody({
      paramName: ['id'],
    })
    @Body()
    payload: UpdateUserDTO,
  ): Promise<User> {
    return plainToClass(
      User,
      await this.service.update(id, { email: payload.email }),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(@Param('id', ParseIntPipe) id: number): Record<string, any> {
    this.service.delete(id);
    return {};
  }
}
