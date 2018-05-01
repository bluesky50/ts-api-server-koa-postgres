// import Joi from 'joi';
// import statusCodes from '../configs/statusCodes';
// import { generateAuthToken, verifyAuthtoken, hashPassword } from '../lib/utils/jwtHelpers';
// import { handleInvalidInput, handleServerError } from '../lib/utils/responseHandlers';
// import { LoginSchema, RegisterUserSchema, GetMeSchema } from '../structures/api-validation-schemas/accessValidationSchemas';

// export function login(ctx: any): void {
// 	const userInfo = ctx.request.body;
// 	const result = Joi.validate(userInfo, LoginSchema);
// 	if (result.error === null) {
// 		const token = generateAuthToken(userInfo);
// 		// update user with new token.
// 		// Hash password
// 		// DB (using sequelize) => check if username + hashPassword exists.
// 		// send back token info
// 		// When the data base has updated the info for the user send back the token.
// 		if (token) {
// 			ctx.body = {
// 				...userInfo,
// 				token
// 			}
// 		} else {
// 			ctx.throw(401, 'access_denied');
// 		}
// 		// if error send server error response.
// 	} else {
// 		handleInvalidInput(ctx, result);
// 	}
// }

// export function register(ctx: any): void {
// 	console.log(ctx.request.body);
// 	const userInfo = ctx.request.body;
// 	const result = Joi.validate(userInfo, RegisterUserSchema);
// 	if (result.error === null) {
// 		// DB (using sequelize) => save user info to database .
// 		// send response as userInfo + token.
// 		// if error send server error response.
// 		const token = generateAuthToken(userInfo);

// 		ctx.body = {
// 			...userInfo,
// 			token
// 		}
// 	} else {
// 		handleInvalidInput(ctx, result);
// 	}
// }

// export function getMe(ctx: any): void {
// 	const userInfo = ctx.request.body;
// 	const result = Joi.validate(userInfo, GetMeSchema);
// 	if (result.error === null) {
// 		// Search db for token info.
// 		// send response with user info
// 		// if error send server error response.
// 	} else {
// 		handleInvalidInput(ctx, result);
// 	}
// }

// // A middleware auth function that gets placed infront of protected routes.
// export async function authenticate (ctx: any, next: any) {
// 	// how to get token from header;
// 	const token = ctx.headers['Authorization'];
// 	const data = verifyAuthtoken(token);
// 	// Check if token is not expired.
// 	if (data) {
// 		// Check if token is valid.
// 		// Search db for token.
// 		// ctx.state.user
// 		// Return with user info.
// 		// return use info to next middleware.
// 		if (token === '12345') {
// 			ctx.state.user = { username: "test-user" };
// 			// ctx.state.user = await databse.getUserFromToken();
// 		} else {
// 			ctx.assert(token, 401, 'No token found');
// 		}
// 	} else {
// 		ctx.assert(token, 401, 'Expired token');
// 	}
// 	ctx.assert(ctx.state.user, 401, 'User not found');
// 	return next();
// }