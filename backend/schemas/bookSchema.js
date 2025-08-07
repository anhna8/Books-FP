import Joi from 'joi'

export const bookSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  author: Joi.string().min(2).max(100).required(),
  rating: Joi.number().min(0).max(5).required(),
  cover: Joi.string().uri().optional(),
  review: Joi.string().max(500).optional()
})
