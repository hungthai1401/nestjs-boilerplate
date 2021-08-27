import { Injectable } from '@nestjs/common';
import { BaseService } from '@module/shared/base.service';
import { UserRepository } from './user.repository';
import { User } from '@entity/user.entity';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  protected readonly repository: UserRepository;
  constructor(repository: UserRepository) {
    super(repository);
  }
}
