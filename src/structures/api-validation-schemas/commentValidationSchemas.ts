import Joi from 'joi';

export const CreateCommentSchema = Joi.object().keys({
	postId: Joi.number().required(),
	content: Joi.string().alphanum().min(1).max(100).required(),
});

export const UpdateCommentSchema = Joi.object().keys({
	postId: Joi.number().required(),
	content: Joi.string().alphanum().min(1).max(100).required(),
});


