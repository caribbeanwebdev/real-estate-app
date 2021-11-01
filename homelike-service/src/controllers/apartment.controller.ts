import { Apartment } from "../models/apartment.model";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";
import {User} from "../models/user.model";

const controller = {
  create: async (req: Request, res: Response) => {
    try {
      const apartmentData = { ...req.body, createdBy: req.user._id };
      const apartment = new Apartment(apartmentData);
      await apartment.save();
      return res.status(httpStatus.CREATED).send({ success: true, apartment });
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, message: error.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      if (!Types.ObjectId.isValid(req.params.id)) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ success: false, message: "Apartment ID is not valid" });
      }
      const updated = await Apartment.findOneAndUpdate(
        {
          _id: req.params.id,
          createdBy: req.user._id,
        },
        {
          ...req.body,
          location: {
            type: "Point",
            coordinates: req.body.location.coordinates,
          },
        }
      );
      const apartment = await Apartment.findById(updated._id);
      if (!updated && !apartment) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ success: false, message: "Apartment not found" });
      }
      return res.status(httpStatus.OK).send({ success: true, apartment });
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, message: error.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      if (!Types.ObjectId.isValid(req.params.id)) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ success: false, message: "Apartment ID is not valid" });
      }
      const apartment = await Apartment.findById(req.params.id);
      if (!apartment) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ success: false, message: "Apartment not found" });
      }
      
      const user = await User.findById(req.user._id);
      const removed = await apartment.remove();
      if (user && removed) {
        const index = user.favorites.indexOf(apartment._id);
        user.favorites.splice(index,1);
        await user.save();
      }
      return res
        .status(httpStatus.OK)
        .send({ success: true });
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, message: error.message });
    }
  },
  searchById: async (req: Request, res: Response) => {
    try {
      if (!Types.ObjectId.isValid(req.params.id)) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ success: false, message: "Apartment ID is not valid" });
      }
      const apartment = await Apartment.findById(req.params.id);
      if (!apartment) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ success: false, message: "Apartment not found" });
      }
      return res.status(httpStatus.OK).send({ success: true, apartment });
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, message: error.message });
    }
  },
  search: async (req: Request, res: Response) => {
    let filters = {};
    req.query.city
      ? (filters = { ...filters, city: String(req.query.city) })
      : filters;
    req.query.country
      ? (filters = { ...filters, country: String(req.query.country) })
      : filters;
    req.query.rooms
      ? (filters = { ...filters, rooms: { $gte: Number(req.query.rooms) } })
      : filters;
    req.query.price
      ? (filters = { ...filters, price: { $gte: Number(req.query.price) } })
      : filters;
    if (req.query.nearest && req.query.longitude && req.query.latitude) {
      filters = {
        ...filters,
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [
                Number(req.query.longitude),
                Number(req.query.latitude),
              ],
            },
            $maxDistance: Number(req.query.nearest) * 1000,
          },
        },
      };
    }
    try {
      const apartments = await Apartment.find(filters)
        .populate("createdBy", "name")
        .exec();
      res.status(httpStatus.OK).send({ success: true, apartments: apartments });
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, message: error.message });
    }
  },
};

export default controller;
