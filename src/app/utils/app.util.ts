import { ConfigService } from '@nestjs/config';

export function isLocal(configService: ConfigService): boolean {
  return configService.get<string>('appEnv') === 'local';
}
