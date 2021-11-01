import Joi from "joi";

const schemas = { 
  apartmentCREATE: Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().max(500).optional(),
    price: Joi.number().min(0).required(),
    address: Joi.string().optional(),
    city: Joi.string().max(500).required(),
    country: Joi.string().max(50).required(),
    rooms: Joi.number().min(1).required(),
    location: Joi.object({
      coordinates: Joi.array().items(Joi.number()).min(2).max(2),
    }),
  }),
  apartmentUPDATE: Joi.object({
    name: Joi.string().max(50).optional(),
    description: Joi.string().max(500).optional(),
    price: Joi.number().min(0).optional(),
    address: Joi.string().optional(),
    city: Joi.string().max(500).optional(),
    country: Joi.string().max(50).optional(),
    rooms: Joi.number().min(1).optional(),
    location: Joi.object({
      coordinates: Joi.array().items(Joi.number()).min(2).max(2),
    }).optional(),
  }),
  apartmentSEARCH: Joi.object({
    city: Joi.string().max(500).optional(),
    country: Joi.string().max(50).optional(),
    rooms: Joi.number().min(1).optional(),
    price: Joi.number().min(0).optional(),
    nearest: Joi.number().min(0),
    longitude: Joi.number().min(-180).max(180),
    latitude: Joi.number().min(-90).max(90),
  }).with('nearest', 'longitude').with('nearest', 'latitude'),
  userREGISTER: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),    
  }),
  userAUTHENTICATE: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),    
  }),
}; 
export default schemas;