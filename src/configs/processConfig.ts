/**
 * Sets the process.env variables for local env testing.
 */

import serverConfig from './serverConfig';

const env = process.env.NODE_ENV || serverConfig.env;

const processConfig: any = {
	'PORT': serverConfig.port,
	'DB_URI': serverConfig.dbUri,
	'NODE_ENV': serverConfig.env,
	'JWT_SECRET': serverConfig.jwtSec
}

if (serverConfig.debug === true) {
	processConfig['DEBUG'] = `${serverConfig.appName}:server`;
}

if (env === 'test' || env === 'dev') {
	Object.keys(processConfig).forEach((k) => {
		process.env[k] = processConfig[k];
	});
}