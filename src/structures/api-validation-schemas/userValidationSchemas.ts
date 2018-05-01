import Joi from 'joi';

export const CreateUserSchema = Joi.object().keys({
	username: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});

export const UpdateUserSchema = Joi.object().keys({
	username: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});