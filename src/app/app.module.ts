import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@config/app.config';
import databaseConfig from '@config/database.config';
import authConfig from '@config/auth.config';
import { DatabaseModule } from '@database/database.module';
import { ValidatorModule } from '@validator/validator.module';
import { UserModule } from '@module/user/user.module';
import { AuthModule } from '@module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
    }),
    DatabaseModule,
    ValidatorModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
