import debug from './debugger';

import Router from 'koa-router';
import AuthController from '../../classes/AuthController';
import AccessController from '../../classes/AccessController';
import HealthController from '../../classes/HealthMonitor';

import IEntitiesController from '../../structures/ts-class-interfaces/IEntitiesController';
import IAccessController from '../../structures/ts-class-interfaces/IAccessController';
import IAuthController from '../../structures/ts-class-interfaces/IAuthController';


/**
 * A function that creates an koa-router.Router based on the controller passed in.
 * @param rootRoute 
 * @param controller 
 */
export function buildEntitiesRouterFromController(rootRoute: string, controller: IEntitiesController): Router {
	const router: Router = new Router({ prefix: rootRoute });

	router.get('/', controller.retrieveAll.bind(controller));
	router.get('/:id', controller.retrieveById.bind(controller));
	router.post('/', controller.createOne.bind(controller));
	router.put('/:id', controller.updateById.bind(controller));
	router.delete('/:id', controller.deleteById.bind(controller));

	return router;
}

/**
 * A function that creates an express.Router based on the controller passed in includes auth.
 * @param rootRoute 
 * @param controller 
 * @param authController 
 */
export function buildEntitiesRouterFromControllerWithAuth(rootRoute: string, controller: IEntitiesController, authController: IAuthController): Router {
	const router: Router = new Router({ prefix: rootRoute });

	router.get('/', authController.authenticate.bind(authController), controller.retrieveAll.bind(controller));
	router.get('/:id', authController.authenticate.bind(authController), controller.retrieveById.bind(controller));
	router.post('/', authController.authenticate.bind(authController), controller.createOne.bind(controller));
	router.put('/:id', authController.authenticate.bind(authController), controller.updateById.bind(controller));
	router.delete('/:id', authController.authenticate.bind(authController), controller.deleteById.bind(controller));

	return router;
}

/**
 * A function the creates a koa-router.Router 
 * @param {AccessController} controller 
 */
export function buildAccessRouter(controller: IAccessController, authController: any): Router {
	const router: Router = new Router({ prefix: "/access" });

	router.get('/me', authController.authenticate.bind(authController), controller.getMe.bind(controller));
	router.post('/login', controller.login.bind(controller));
	router.post('/register', controller.register.bind(controller));

	return router;
}

/**
 * A function that builds the routes for the server health status.
 * @param controller 
 * @param authController 
 */
export function buildHealthRouter(controller: HealthController, authController: IAuthController): Router {
	const router: Router = new Router();

	router.get('/status', authController.authenticate.bind(authController), controller.getStatus.bind(controller));

	return router;
}

/**
 * A function that creates a koa-router without authenitcation.
 * @param {string} rootRoute 
 * @param {sequelize.model} model 
 * @param {object} validationSchema 
 * @returns {koa-router.Router}
 */
// export function buildEntitiesRouterFromModel(rootRoute: string, model: any, validationSchema: any): Router {
// 	const collectionAdapter = new CollectionAdapter(model);
// 	const controller = new EntitiesController(collectionAdapter, validationSchema);
// 	const router: Router = new Router({ prefix: rootRoute });

// 	router.get('/', controller.retrieveAll.bind(controller));
// 	router.get('/:id', controller.retrieveById.bind(controller));
// 	router.post('/', controller.createOne.bind(controller));
// 	router.put('/:id', controller.updateById.bind(controller));
// 	router.delete('/:id', controller.deleteById.bind(controller));

// 	return router; 
// }

// export function buildEntitiesRouterFromModelWithAuth(rootRoute: string, model: any, validationSchema: any, authController: any): Router {
// 	const collectionAdapter = new CollectionAdapter(model);
// 	const controller = new EntitiesController(collectionAdapter, validationSchema);
// 	const router: Router = new Router({ prefix: rootRoute });

// 	router.get('/', authController.authorize.bind(authController), controller.retrieveAll.bind(controller));
// 	router.get('/:id', controller.retrieveById.bind(controller));
// 	router.post('/', controller.createOne.bind(controller));
// 	router.put('/:id', controller.updateById.bind(controller));
// 	router.delete('/:id', controller.deleteById.bind(controller));

// 	return router; 
// }


/**
 * A function that creates the default routes for the server if none are provided to the server.
 * @param app 
 */
// export function initDefaultRoutes(app: any): void {
// 	// Server health check routes.
// 	const healthController = new HealthController(new CollectionAdapter(User), LoginSchema, RegisterUserSchema);
// 	const healthRouter = buildHealthRouter(healthController);
// 	app.use(healthRouter.routes());
// 	app.use(healthRouter.allowedMethods({
// 		throw: true,
// 		notImplemented: () => new Boom.notImplemented(),
// 		methodNotAllowed: () => new Boom.methodNotAllowed()
// 	}));

// 	// Login routes
// 	const authController = new AuthController(new CollectionAdapter(User), LoginSchema, RegisterUserSchema);
// 	const authRouter = buildAuthRouter(AuthController);
// 	app.use(authRouter.routes());
// 	app.use(authRouter.allowedMethods({
// 		throw: true,
// 		notImplemented: () => new Boom.notImplemented(),
// 		methodNotAllowed: () => new Boom.methodNotAllowed()
// 	}));

// 	// Entities routes
// 	const postsController = new EntitiesController(new CollectionAdapter(Post), CreatePostSchema, CreatePostSchema);
// 	const commentsController = new EntitiesController(new CollectionAdapter(Comments), CreateCommentSchema, CreateCommentSchema);

// 	const postsRouter = buildEntitiesRouter('/posts', postsController);
// 	const commentsRouter = buildEntitiesRouter('/comments', commentsController)

// 	// add auth and route limits.
// 	app.use(postsRouter.routes());
// 	app.use(postsRouter.allowedMethods({
// 		throw: true,
// 		notImplemented: () => new Boom.notImplemented(),
// 		methodNotAllowed: () => new Boom.methodNotAllowed()
// 	}));
// 	app.use(commentsRouter.routes());
// 	app.use(commentsRouter.allowedMethods({
// 		throw: true,
// 		notImplemented: () => new Boom.notImplemented(),
// 		methodNotAllowed: () => new Boom.methodNotAllowed()
// 	}));
// }


