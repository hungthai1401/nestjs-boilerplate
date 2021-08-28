import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@config/app.config';
import databaseConfig from '@config/database.config';
import authConfig from '@config/auth.config';
import { DatabaseModule } from '@database/database.module';
import { ValidatorModule } from '@validator/validator.module';
import { UserModule } from '@module/user/user.module';
import { AuthModule } from '@module/auth/auth.module';
import { ResponseMiddleware } from '@middleware/response.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ResponseMiddleware).forRoutes('/');
  }
}
