import IEntitiesController from './IEntitiesController';

// OLD VERSION
// export interface IRouteConfig {
// 	route: string;
// 	controller: IEntitiesController;
// 	type: 'standard' | 'custom';
// 	useBuilder?: boolean;
// 	builder?: any;
// }

export interface IRouteConfig {
	route: string,
	type: 'standard' | 'custom', // standard | custom 
	access: 'public' | 'protected', // public | protected,
	model: any, // some sort of data model.
	endpointValidation: any,
	useBuilder?: boolean,
	builder?: '', // should be a function that can be used to build the koa routes.
}

export default IRouteConfig