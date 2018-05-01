import Joi from 'joi';

export const CreatePostSchema = Joi.object().keys({
	title: Joi.string().alphanum().min(3).max(30).required(),
	content: Joi.string().alphanum().min(3).max(100).required(),
});

export const UpdatePostSchema = Joi.object().keys({
	title: Joi.string().alphanum().min(3).max(30).required(),
	content: Joi.string().alphanum().min(3).max(100).required(),
});