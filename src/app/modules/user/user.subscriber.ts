import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
  InsertEvent,
} from 'typeorm';
import { User } from '@entity/user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private readonly salt: number;

  constructor(
    private readonly conntection: Connection,
    private readonly configService: ConfigService,
  ) {
    conntection.subscribers.push(this);
    this.salt = configService.get<number>('appBcryptSalt');
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {
    const { password } = event.entity;
    event.entity.password = await bcrypt.hash(password, this.salt);
  }
}
