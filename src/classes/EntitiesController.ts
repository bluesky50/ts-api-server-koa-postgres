// import Koa from 'koa';
// import Joi from 'joi';
// import statusCodes from '../configs/statusCodes';
// import { handleServerError, handleInvalidInput } from '../lib/utils/responseHandlers';

// import IEntitiesController from '../structures/ts-class-interfaces/IEntitiesController';
// import ICollectionAdapter from '../structures/ts-class-interfaces/ICollectionAdapter';
// /**
//  * Controller class. The controller is used by the routerBuilder function to create an express Routers.
//  */
// export default class EntitiesController implements IEntitiesController {
// 	private validationSchemas: object;
// 	private collectionAdapter: ICollectionAdapter;

// 	constructor(collectionAdapter: ICollectionAdapter, validationSchemas: any) {
// 		this.validationSchemas = validationSchemas;
// 		this.collectionAdapter = collectionAdapter;
// 	}

// 	public getCollectionAdapter() {
// 		return this.collectionAdapter;
// 	}

// 	public retrieveAll(): void {

// 	}

// 	public retrieve(): void {
	
// 	}

// 	public retrieveById(): void {
		
// 	}

// 	public createOne(): void {
		
// 	}

// 	public updateById(): void {
		
// 	}

// 	public deleteById(): void {
		
// 	}
// }