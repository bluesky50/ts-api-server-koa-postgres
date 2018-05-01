import Joi from 'joi';

/**
 * Validation schemas for the endpoints to validate against.
 */

export const RegisterUserSchema = Joi.object().keys({
	username: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});

export const LoginSchema = Joi.object().keys({
	username: Joi.string().alphanum().min(3).max(30).required(),
	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});

export const GetMeSchema = Joi.object().keys({
	token: Joi.string().required()
});

// {
// 	username: 'string',
// 	email: 'string',
// 	about: 'string'
// }

// export const PostValidationSchema = Joi.object().keys({
// 	title: Joi.string().alphanum().min(3).max(30).required(),

// })

// {
// 	title: 'string',
// 	content: 'string',
// 	author: 'id'
// }

// export const CommentValidationSchema = {
// 	user: 'id',
// 	post: 'id',
// 	content: 'string',
// }