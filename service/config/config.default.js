/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629600038470_3701';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3308',
      // username
      user: 'root',
      // password
      password: '108719',
      // database
      database: 'onlineshop',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  //跨域配置
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,POST,HEAD,POST,DELETE'
  }

  return {
    ...config,
    ...userConfig,
  };
};

