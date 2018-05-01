import debug from './debugger';
import Router from 'koa-router';
import middleware from '../middleware/middleware';

import StatusController from '../../classes/StatusController';
// import * as AccessControllerMock from '../../controllers/AccessController';

import { buildEntitiesRouterFromController, buildEntitiesRouterFromControllerWithAuth, buildAccessRouter } from './routeBuilders';

/**
 * A function that applies middleware.
 * @param app 
 */
export function initMiddleware(app: any) {
	// this.app.use(middleware.cors());					
	app.use(middleware.logger());
	app.use(middleware.helmet());
	app.use(middleware.koaBody({
		onError: function(err, ctx) {
			ctx.throw('body parse error', 422);
		}
	}));

	// app.use(middleware.bodyParser({
	// 	onerror: function(err, ctx) {
			
	// 	}
	// }));

	// this.app.use(new middleware.CSRF({
	// 	invalidSessionSecretMessage: 'Invalid session secret',
	// 	invalidSessionSecretStatusCode: 403,
	// 	invalidTokenMessage: 'Invalid CSRF token',
	// 	invalidTokenStatusCode: 403,
	// 	excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
	// 	disableQuery: false
	// }));
}

/**
 * A function that adds test routes.
 * @param app 
 */
// export function initTestRoutes(app: any): void {
// 	const router = new Router({ prefix: "/test" });
// 	router.post('/login', AccessControllerMock.login);

// 	router.post('/register', AccessControllerMock.register);

// 	router.post('/protected', AccessControllerMock.authenticate, (ctx: any) => {
// 		ctx.body = ctx.state.user;
// 	});
	
// 	app.use(router.routes());
// 	app.use(router.allowedMethods());
// }

/**
 * A function that adds access routes to the server.
 * @param app 
 * @param authController 
 */
export function initServerAccessRotues(app: any, accessController: any, authController: any): void {
	debug(`Adding server access routes`);
	app.use(buildAccessRouter(accessController, authController).routes());
}

/**
 * A function that initializes the server status routes.
 * @param app 
 * @param healthMonitor 
 */
export function initServerStatusRoutes(app: any, healthMonitor: any): void {
	
	const controller = new StatusController(healthMonitor);

	const router = new Router();
	router.get('/status', controller.serverStatus.bind(controller));
	debug(`Adding public server status routes`);
	app.use(router.routes());
	app.use(router.allowedMethods());
}

/**
 * A function that initializes all entities routes for the server.
 * @param app 
 * @param routesConfig 
 * @param authController 
 */
export function initAllEntitiesRoutesFromRoutesConfig(app: any, routesConfig: any, authController: any): void {
	for (let key in routesConfig) {
		initEntitiesRoutes(app, routesConfig[key], authController);
	}
}

/**
 * A function that initializes the routes for an entity based on a route config object.
 * @param app 
 * @param routeConfig 
 * @param authController 
 */
export function initEntitiesRoutes(app: any, routeConfig: any, authController: any): void {
	if (routeConfig.route || routeConfig.controller) {
		if (routeConfig.type === 'standard' ) {
			if (routeConfig.access === 'public') {
				debug(`Adding public ${routeConfig.route} routes`);
				app.use(buildEntitiesRouterFromController(routeConfig.route, routeConfig.controller).routes());
			} else if (routeConfig.access === 'protected') {
				debug(`Adding protected ${routeConfig.route} routes`);
				app.use(buildEntitiesRouterFromControllerWithAuth(routeConfig.route, routeConfig.controller, authController).routes());
			} else {
				debug(`Route configuration not set to either public or protected`);	
			}
		} else if (routeConfig.type == 'custom' && routeConfig.useBuilder && typeof(routeConfig.builder) === 'function') {
			app.use(routeConfig.route, routeConfig.builder(routeConfig.controller)); 
		} else {
			// Necessary information not on config.
			debug(`Route configuration info not suitable for creation of ${routeConfig.routes} endpoints`);
		}
	} else {
		debug(`Route configuration info not not found.`);
	}
}

/** Decided against using this type of functionality.
 * Will initialize routes based on configuration object rather than models on the orm directly.
 * This is more explicit and requires less assumptions.
 * Prevents dependency on orn models and possible flawes in orm model to trickle down to routes as well.

export function initAllEntitiesRoutesFromModels(app: any, models: any): void {
	for (let key in models) {
		const route = `/${key}s`;
		initEntitiesRoutesFromModel(app, route, models[key]);
	}
}

export function initEntitiesRoutesFromModel(app: any, route: string, model: any): void {

	const router = buildEntitiesRouterFromModel(route, model);
	app.use(router.routes());
	app.use(router.allowedMethods());
}
*/

