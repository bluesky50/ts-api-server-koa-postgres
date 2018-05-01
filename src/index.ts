require('./configs/processConfig');

import Server from './classes/server';
import OrmAdapter from './classes/OrmAdapter';

import UserCollectionAdapter from './classes/UserCollectionAdapter';
import PostCollectionAdapter from './classes/PostCollectionAdapter';
import CommentCollectionAdapter from './classes/CommentCollectionAdapter';

import UserController from './classes/UserController';
import PostController from './classes/PostController';
import CommentController from './classes/CommentController';

import * as commentValidationSchemas from './structures/api-validation-schemas/commentValidationSchemas';
import * as postValidationSchemas from './structures/api-validation-schemas/postValidationSchemas';
import * as userValidationSchemas from './structures/api-validation-schemas/userValidationSchemas';

import IRouteConfig from './structures/ts-class-interfaces/IRouteConfig';
import serverConfig from './configs/serverConfig';
import { registerProcessEvents } from './lib/utils/appHelpers';

/**
 * The orm class that is used to connect to the data source.
 */
const dataSource = new OrmAdapter(serverConfig);

/**
 * Initialize collection adapters that will be referenced in the routesConfig.
 */
const collectionAdapters = {
	user: new UserCollectionAdapter(dataSource),
	post: new PostCollectionAdapter(dataSource),
	comment: new CommentCollectionAdapter(dataSource)
}

/**
 * Endpoint point validation schemas for request body.
 */
const validationSchemas = {
	user: userValidationSchemas,
	post: postValidationSchemas,
	comment: commentValidationSchemas
};

/**
 * routesConfig is the endpoint information used to initialize routes.
 * 'standard' represents default CRUD api endpoints structure.
 * 'protected' indicates authentication is added.
 * the collectionAdapter + endpointValidation is used to build the entities controller (which provides functionality for CRUD endpoints).
 */
const routesConfig = {
	users: {
		route: '/protected/users',
		type: 'standard', // standard | custom 
		access: 'protected', // public | protected,
		controller: new UserController(collectionAdapters.user, validationSchemas.user),
		useBuilder: false,
		builder: ''
	},
	posts: {
		route: '/protected/posts',
		type: 'standard', // standard | custom 
		access: 'protected', // public | protected,
		controller: new PostController(collectionAdapters.post, validationSchemas.post),
		useBuilder: false,
		builder: ''
	},
	comments: {
		route: '/protected/comments',
		type: 'standard', // standard | custom 
		access: 'protected', // public | protected,
		controller: new CommentController(collectionAdapters.comment, validationSchemas.comment),
		useBuilder: false,
		builder: ''
	}
}

/**
 * Initializing server object with configurations.
 */
const server = new Server(serverConfig, routesConfig, dataSource, collectionAdapters, undefined);

/**
 * Adding process events for graceful handling of errors.
 */
registerProcessEvents(server);

/**
 * Initializing server run sequence.
 */
server.run();

// setTimeout(() => {
// 	server.shutdown();
// }, 3000);


// const routesConfigsOldStyle = {
// 	users: <IRouteConfig>{
// 		route: '/users',
// 		controller: new EntitiesController(new CollectionAdapter(dataSource.getModel('user')), validationSchemas.users),
// 		type: 'standard'
// 	},
// 	posts: <IRouteConfig>{
// 		route: '/posts',
// 		controller: new EntitiesController(new CollectionAdapter(dataSource.getModel('post')), validationSchemas.posts),
// 		type: 'standard'
// 	},
// 	comments: <IRouteConfig>{
// 		route: '/comments',
// 		controller: new EntitiesController(new CollectionAdapter(dataSource.getModel('comment')), validationSchemas.comments),
// 		type: 'standard'
// 	}
// }


// server.shutdown();
// function createServiceLib(): IServiceContainer {
// 	const serviceContainer: IServicesContainer = {
// 		middleware: {
// 			logger: '',
// 		},
// 		tools: {
// 			authenticator: '',
// 			healthMonitor: '',
// 			hasher: '',
// 		}
// 	}
// 	return serviceContainer;
// }