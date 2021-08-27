import { IsNotEmpty, Length, IsEmail, Validate } from 'class-validator';
import { UniqueValidator } from '@validator/rules/unique.validator';
import { User } from '@entity/user.entity';

export class CreateUserDTO {
  @IsNotEmpty()
  @Length(6, 50)
  @Validate(UniqueValidator, [User, 'username'])
  readonly username: string;

  @IsNotEmpty()
  @Length(6, 12)
  readonly password: string;

  @IsNotEmpty()
  @Length(6, 50)
  @IsEmail()
  @Validate(UniqueValidator, [User, 'email'])
  readonly email: string;
}
