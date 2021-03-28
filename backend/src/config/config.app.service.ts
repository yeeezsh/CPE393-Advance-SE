import { Injectable } from '@nestjs/common';
import { ConfigEnvType } from './@types/config.env.type';

@Injectable()
export class ConfigAppService {
  get() {
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
