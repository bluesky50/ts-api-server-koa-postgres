/**
 * Server configuration variables for local env testing.
 */
export const defaultServerConfig = {
	appName: 'myApp',
	host: 'localhost',
	env: 'dev',
	port: 3000,
	dbUri: 'mongodb://localhost:27017/',
	debug: true,
	jwtSec: 'abc123',
	dbUsername: 'postgres',
	dbPassword: 'postgres',
	dbHost: 'localhost',
	dbName: 'myapp'
}

export const localConfig = {
	appName: 'myApp',
	host: 'localhost',
	env: 'dev',
	port: 3000,
	dbUri: 'mongodb://localhost:27017/',
	debug: true,
	jwtSec: 'abc123',
	dbUsername: 'postgres',
	dbPassword: 'postgres',
	dbHost: 'localhost',
	dbName: 'myapp'
}

export default defaultServerConfig;