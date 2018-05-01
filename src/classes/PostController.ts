import Koa from 'koa';
import Joi from 'joi';
import statusCodes from '../configs/statusCodes';
import { handleServerError, handleInvalidInput } from '../lib/utils/responseHandlers';

import IEntitiesController from '../structures/ts-class-interfaces/IEntitiesController';
import ICollectionAdapter from '../structures/ts-class-interfaces/ICollectionAdapter';

/**
 * Controller class. The controller is used by the routerBuilder function to create a routers.
 */
export default class PostController implements IEntitiesController {
	private validationSchemas: any;
	private collectionAdapter: ICollectionAdapter;

	constructor(collectionAdapter: ICollectionAdapter, validationSchemas: any) {
		this.validationSchemas = validationSchemas;
		this.collectionAdapter = collectionAdapter;
	}

	public getCollectionAdapter() {
		return this.collectionAdapter;
	}

	async retrieveAll(ctx: Koa.Context, next: () => Promise<any>) {
		await this.collectionAdapter.retrieve()
			.then((data: any) => {
				ctx.body = { data };
			})
			.catch((err: any) => {
				handleServerError(ctx, err);
			});
	}

	async retrieve(ctx: Koa.Context, next: () => Promise<any>) {
		await this.collectionAdapter.retrieve()
		.then((data: any) => {
			ctx.body = { data };
		})
		.catch((err: any) => {
			handleServerError(ctx, err);
		});
	}

	async retrieveById(ctx: Koa.Context, next: () => Promise<any>) {
		const id = parseInt(ctx.params.id);
		await this.collectionAdapter.findById(id)
			.then((data: any) => {
				ctx.body = { data };
			})
			.catch((err: any) => {
				handleServerError(ctx, err);
			});
	}

	async createOne(ctx: Koa.Context, next: () => Promise<any>) {
		const newItem = ctx.request.body; 
		const result = Joi.validate(newItem, this.validationSchemas.CreatePostSchema);
		if (result.error === null) {
			await this.collectionAdapter.create({ ...newItem, authorId: ctx.state.user.id })
				.then((data: any) => {
					ctx.body = { data };
				})
				.catch((err: any) => {
					handleServerError(ctx, err);
				});
			return;
		} else {
			handleInvalidInput(ctx, result);
		}
	}

	async updateById(ctx: Koa.Context, next: () => Promise<any>) {
		const id = parseInt(ctx.params.id);
		const updateItem = ctx.body;
		const result = Joi.validate(updateItem, this.validationSchemas.UpdatePostSchema);

		if (result.error === null) {
			await this.collectionAdapter.updateById(id, updateItem)
				.then((data: any) => {
					ctx.body = { data };
				})
				.catch((err: any) => {
					handleServerError(ctx, err);
				});
		} else {
			handleInvalidInput(ctx, result);
		}
	}

	async deleteById(ctx: Koa.Context, next: () => Promise<any>) {
		const id = ctx.params.id;

		await this.collectionAdapter.removeById(id) 
			.then((data: any) => {
				ctx.body = { data };
			})
			.catch((err: any) => {
				handleServerError(ctx, err);
			});
	}
}