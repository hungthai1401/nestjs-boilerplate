import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueValidator } from './rules/unique.validator';

@Module({
  imports: [TypeOrmModule],
  providers: [UniqueValidator],
  exports: [UniqueValidator],
})
export class ValidatorModule {}
