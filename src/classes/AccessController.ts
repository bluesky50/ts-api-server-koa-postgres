import Koa from 'koa';
import Joi from 'joi';
import statusCodes from '../configs/statusCodes';
import { handleServerError, handleInvalidInput } from '../lib/utils/responseHandlers';
import { generateAuthToken, verifyAuthtoken } from '../lib/utils/jwtHelpers';
import { LoginSchema, RegisterUserSchema, GetMeSchema } from '../structures/api-validation-schemas/accessValidationSchemas'

import IAccessController from '../structures/ts-class-interfaces/IAccessController';
import ICollectionAdapter from '../structures/ts-class-interfaces/ICollectionAdapter';

/**
 * AccessController class defines controllers for access routes on server.
 */
export default class AccessController implements IAccessController {
	private userCollectionAdapter: any;

	constructor(collectionAdapter: ICollectionAdapter) {
		this.userCollectionAdapter = collectionAdapter;
	}

	async login(ctx: Koa.Context, next: () => Promise<any>) {
		const userInfo = ctx.request.body;
		const result = Joi.validate(userInfo, LoginSchema);
		if (result.error === null) {
			await this.userCollectionAdapter.loginUser(userInfo.username, userInfo.password)
				.then((data: any) => {
					ctx.body = data;
				})
				.catch((err: any) => {
					handleServerError(ctx, err);
				});
			return;
		} else {
			handleInvalidInput(ctx, result);
		}
	}

	async register(ctx: Koa.Context, next: () => Promise<any>) {
		const userInfo = ctx.request.body;
		const result = Joi.validate(userInfo, RegisterUserSchema);

		if (result.error === null) {
			await this.userCollectionAdapter.registerUser(userInfo)
				.then((data: any) => {
					// console.log(data);
					ctx.body = data;
				})
				.catch((err: any) => {
					handleServerError(ctx, err);
				});
			return;
		} else {
			handleInvalidInput(ctx, result);
		}
	}
	
	public getMe(ctx: Koa.Context, next: () => Promise<any>): void {
		// ctx.assert(ctx.state.user, 401, 'No data found');
		ctx.assert(ctx.state.user, 401, 'User not found');
		ctx.body = ctx.state.user;
	}
}