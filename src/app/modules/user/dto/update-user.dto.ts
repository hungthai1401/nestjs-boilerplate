import { User } from '@entity/user.entity';
import { UniqueValidator } from '@validator/rules/unique.validator';
import { IsEmail, IsNotEmpty, Length, Validate } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @Length(6, 50)
  @Validate(UniqueValidator, [User, 'email', 'id'])
  readonly email;
}
