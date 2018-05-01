import Koa from 'koa';

export interface IEntitiesController {
	getCollectionAdapter(ctx: Koa.Context, next: () => Promise<any>): any;
	retrieveAll(ctx: Koa.Context, next: () => Promise<any>): void;
	retrieve(ctx: Koa.Context, next: () => Promise<any>): void;
	retrieveById(ctx: Koa.Context, next: () => Promise<any>): void;
	createOne(ctx: Koa.Context, next: () => Promise<any>): void;
	updateById(ctx: Koa.Context, next: () => Promise<any>): void;
	deleteById(ctx: Koa.Context, next: () => Promise<any>): void;
}

export default IEntitiesController;