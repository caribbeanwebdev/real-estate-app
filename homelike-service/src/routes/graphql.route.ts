
import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import { Router } from "express";
import { graphqlHTTP } from 'express-graphql';
import { Apartment } from '../models/apartment.model';

const router: Router = Router();

const customizationOptions = {}; 
const ApartmentTC = composeMongoose(Apartment, customizationOptions);
schemaComposer.Query.addFields({
  apartmentById: ApartmentTC.mongooseResolvers.findById(),
  apartmentByIds: ApartmentTC.mongooseResolvers.findByIds(),
  apartmentOne: ApartmentTC.mongooseResolvers.findOne(),
  apartmentMany: ApartmentTC.mongooseResolvers.findMany(),
  apartmentCount: ApartmentTC.mongooseResolvers.count(),
  apartmentPagination: ApartmentTC.mongooseResolvers.pagination(),
});
const graphqlSchema = schemaComposer.buildSchema();

router.use(graphqlHTTP({
	schema: graphqlSchema,
	graphiql: true
}))

export default router;