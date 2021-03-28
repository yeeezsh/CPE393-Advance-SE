import { Injectable, Logger } from '@nestjs/common';
import { ConfigAppServiceType } from './@types/config-app.service.type';
import { ConfigEnvType } from './@types/config.env.type';

@Injectable()
export class ConfigAppService {
  private validate(): void {
    const {
      DATABASE_CONNECTION,
      DATABASE_USERNAME,
      DATABASE_PASSWORD,
      DATABASE_AUTH_SOURCE,
      PORT,
      ORIGIN,
      TZ,
    } = process.env as ConfigEnvType;

    if (
      (!DATABASE_CONNECTION && typeof DATABASE_CONNECTION !== 'string') ||
      DATABASE_CONNECTION === ''
    )
      Logger.error('DATABASE_CONNECTION should be filled');
    if (
      (!DATABASE_USERNAME && typeof DATABASE_USERNAME !== 'string') ||
      DATABASE_USERNAME === ''
    )
      Logger.error('DATABASE_USERNAME should be filled');
    if (
      !DATABASE_PASSWORD &&
      DATABASE_PASSWORD !== '' &&
      typeof DATABASE_PASSWORD !== 'string'
    )
      // allow empty
      Logger.error('DATABASE_PASSWORD should be filled or empty string');
    if (
      (!DATABASE_AUTH_SOURCE && typeof DATABASE_AUTH_SOURCE !== 'string') ||
      DATABASE_AUTH_SOURCE === ''
    )
      Logger.error('DATABASE_AUTH_SOURCE should be filled');
    if ((!ORIGIN && typeof ORIGIN !== 'string') || ORIGIN === '')
      Logger.error('ORIGIN should be filled');
    if (
      (!PORT && typeof PORT !== 'string') ||
      Number.isNaN(Number(PORT)) ||
      PORT === ''
    )
      Logger.error('PORT should only string like number fill');
    if ((!TZ && typeof TZ !== 'string') || TZ === '')
      // allow empty but warn
      Logger.warn('TZ should be filled');
  }

  get(): ConfigAppServiceType {
    this.validate();

    const {
      DATABASE_CONNECTION,
      DATABASE_USERNAME,
      DATABASE_PASSWORD,
      DATABASE_AUTH_SOURCE,
      PORT,
      ORIGIN,
      TZ,
    } = process.env as ConfigEnvType;

    return {
      database: {
        connection_string: DATABASE_CONNECTION,
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        auth_source: DATABASE_AUTH_SOURCE,
      },
      port: Number(PORT),
      origin: ORIGIN,
      timezone: TZ,
    };
  }
}
