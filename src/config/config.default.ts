import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { ConnectionOptions } from 'typeorm';
export type DefaultConfig = PowerPartial<EggAppConfig>;
const connectionConfiguration = (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';
  // add your config here
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.middleware = ['errorHandler'];
  config.errorHandler = {
    match: ['/users', '/trades'],
  };
  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };
  config.admin = {
    username: 'admin',
    password: 'admin',
  };

  // Config setting for localhost
  config.orm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'pf-trade',
    synchronize: false,
    logging: false,
    timezone: '+08:00',
  } as ConnectionOptions;

  return config;
};

export default connectionConfiguration;
