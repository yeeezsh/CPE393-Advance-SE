export type ConfigProviderValue = {
  port: number;
  origin: string;
  database: {
    connection_string: string;
    username: string;
    password: string;
    auth_source: string | 'admin';
  };
  timezone: string;
};
