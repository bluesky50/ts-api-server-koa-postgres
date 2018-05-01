import statusCodes from '../../configs/statusCodes';

/**
 * A function that sense a response if the req.body is invalid.
 * @param res 
 */
export function handleInvalidInput(ctx: any, result: any): void {
	ctx.throw(statusCodes.STATUS_UNPROCESSABLE_ENTITY, result.error.message, result.value);
	// ctx.body = { message: result.error.message };
	// ctx.status(statusCodes.STATUS_UNPROCESSABLE_ENTITY);
	// ctx.json({ status: statusCodes.STATUS_UNPROCESSABLE_ENTITY, message: 'Invalid request body' });
}

/**
 * A function that sends a response if there is an error requesting data from the database.
 * @param ctx 
 * @param err 
 */
export function handleServerError(ctx: any, err: any): void {
	ctx.throw(statusCodes.STATUS_SERVER_ERROR, err.message);
	// ctx.body = { message: err.message };
	// ctx.status(statusCodes.STATUS_SERVER_ERROR);
	// ctx.json({ status: statusCodes.STATUS_SERVER_ERROR, message: err.message });
}