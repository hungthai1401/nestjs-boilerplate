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
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { User } from '@entity/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AddParamsToBody } from '@decorator/add-params-to-body.decorator';
import { ok, created, noContent } from '@util/response.util';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async index(@Res() res): Promise<Record<string, User[]>> {
    return res.json(ok(plainToClass(User, await this.service.findAll())));
  }

  @Get(':id')
  async show(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ): Promise<Record<string, User>> {
    return res.json(
      ok({
        data: plainToClass(User, await this.service.findOrFailById(id)),
      }),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateUserDTO,
    @Res() res,
  ): Promise<Record<string, User>> {
    return res.json(
      created(plainToClass(User, await this.service.store(payload))),
    );
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @AddParamsToBody({
      paramName: ['id'],
    })
    @Body()
    payload: UpdateUserDTO,
    @Res() res,
  ): Promise<Record<string, User>> {
    return res.json(
      ok(
        plainToClass(
          User,
          await this.service.update(id, { email: payload.email }),
        ),
      ),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ): Record<string, any> {
    this.service.delete(id);
    return res.json(noContent());
  }
}
