import { IsNotEmpty, Length } from 'class-validator';

export class CridentialDTO {
  @IsNotEmpty()
  @Length(6, 50)
  readonly username: string;

  @IsNotEmpty()
  @Length(6, 12)
  readonly password: string;
}
