import koaBody from 'koa-body';
import logger from 'koa-logger';
import helmet from 'koa-helmet';

// import CSRF from 'koa-csrf';
// const cors = require('@koa/cors');

const middleware = {
	koaBody,
	logger,
	helmet,

	// CSRF,
	// cors
};

export default middleware;