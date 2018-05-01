import http from 'http';
import Koa from 'koa';
import Router from 'koa-router';
import debug from '../lib/utils/debugger';
import HealthMonitor from './HealthMonitor';
import OrmAdapter from './OrmAdapter';
import IServer from '../structures/ts-class-interfaces/IServer';

import AccessController from './AccessController';
import AuthController from './AuthController';

import { normalizePort, onError, onListening } from '../lib/utils/serverHelpers';
import { initMiddleware, initServerStatusRoutes, initServerAccessRotues ,initAllEntitiesRoutesFromRoutesConfig } from '../lib/utils/serverInitializationHelpers';

/**
 * Server class.
 */
export default class Server implements IServer {
	private serverConfig: any;
	private routesConfig: any;
	private app: any;
	private server: any;
	private healthMonitor: any;
	private dataSource: any;
	private collectionAdapters: any;

	constructor(serverConfig: object, routesConfig: object, ormAdapter: any, collectionAdapters: any, app?: any) {
		this.serverConfig = serverConfig;
		this.routesConfig = routesConfig;
		this.app = app;
		this.dataSource = ormAdapter;
		this.collectionAdapters = collectionAdapters;
		this.healthMonitor = new HealthMonitor();
	}

	public getApp() {
		return this.app;
	}

	public getServer() {
		return this.server;
	}

	public shutdown() {
		debug(`Shutdown sequence...`);
		this.dataSource.disconnect();
		this.server.close();
	}

	public run() {
		this._pre();
		if (process.env.NODE_ENV !== 'test' || this.serverConfig.env !== 'test') this._start();
		if (process.env.NODE_ENV !== 'test' || this.serverConfig.env !== 'test') this._post();
	}

	private _pre() {
		debug('Pre sequence...');
		this._initializeApp();
		this._initializeDataSource();
		this._initializeRoutes();
	}

	private _start() {
		debug('Start sequence...');
		// normalize port
		const port = normalizePort(process.env.PORT || this.serverConfig.port);

		// Create HTTP server.
		this.server = http.createServer(this.app.callback());
		this.server.on('error', onError(port));
		this.server.on('listening', onListening(this.server));

		// Listen on provided port, on all network interfaces.
		this.server.listen(port);
	}

	private _post() {
		debug('Post sequence...');
	}

	private _initializeApp() {
		if (this.app === undefined || this.app === null) {
			debug('Initializing app');
			this.app = new Koa();
		}
	}

	private _initializeDataSource() {
		// perform necessary configuration or initialization.
		if (this.dataSource === undefined || this.dataSource === null) {
			debug('No data source found');
			this.shutdown();
			// if (process.env.NODE_ENV == 'test' || this.serverConfig.env == 'test') {
			// 	this.dataSource = new OrmAdapter(this.serverConfig);
			// } else {
			// 	this.dataSource = new OrmAdapter(this.serverConfig);
			// }
		} else {

		}
	}

	private _initializeRoutes() {

		const accessController = new AccessController(this.collectionAdapters.user);
		const authController = new AuthController(this.collectionAdapters.user);

		// Initialize middleware
		initMiddleware(this.app);

		// Setup routes using route configs if avaiilable.
		if (this.routesConfig === undefined || this.routesConfig === null) {
			debug(`No routes config found`);
			
			
			// Stop server if no routes config information is available.
			this.shutdown();

			// Was going to have a function the built the routes based on the provided models and validation schemas params.
			// Decided to stick with only building using routes configuration.
			// initAllEntitiesRoutesFromModels(this.app, this.dataSource.models, endpointValidationSchemas);

		} else {
			if (this.dataSource === undefined || this.dataSource === null) {
				// Possible incorrect server or routes configuration.
				debug('No data source found');
				this.shutdown();
				return;
			} 
			debug('Initializing routes');
			// initTestRoutes(this.app);
			initServerStatusRoutes(this.app, this.healthMonitor);
			initServerAccessRotues(this.app, accessController, authController);
			initAllEntitiesRoutesFromRoutesConfig(this.app, this.routesConfig, authController);
		} 
	}
}