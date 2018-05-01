import Koa from 'koa';
import { generateAuthToken, verifyAuthtoken, hashPassword } from '../lib/utils/jwtHelpers';
import { handleServerError } from '../lib/utils/responseHandlers';

/**
 * A class that hold authentication middleware function.
 */
export default class AuthenticationController {
	private userCollectionAdapter: any;

	constructor(collectionAdapter: any) {
		this.userCollectionAdapter = collectionAdapter;
	}

	// A middleware auth function that gets placed infront of protected routes.
 	async authenticate (ctx: Koa.Context, next: () => Promise<any>) {
		// how to get token from header;
		const token = ctx.request.headers['authorization'];
		
		// const decoded = verifyAuthtoken(token);
		// Check if token is not expired.
		
		if (token) {
			// Check if token is valid.
			await this.userCollectionAdapter.findByToken(token)
				.then((data: any) => {		
					console.log(data.dataValues);			
					ctx.state.user = data;
				})
				.catch((err: any) => {
					handleServerError(ctx, err);
				});
		} else {
			ctx.assert(token, 401, 'Null or expired token');
		}
	
		// ctx.assert(ctx.state.user, 401, 'User not found');
		
		return next();
	}
}