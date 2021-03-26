import { Provider } from '@nestjs/common';
import { CONFIG_PROVIDER } from './@types/config.constant';
import { ConfigEnvType } from './@types/config.env';
import { ConfigType } from './@types/config.type';

export const configProvider: Provider<ConfigType> = {
  provide: CONFIG_PROVIDER,
  useValue: ((): ConfigType => {
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
  })(),
};
