import { Apartment } from "../models/apartment.model";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { User } from "../models/user.model";
import { Types } from "mongoose";

const controller = {
  mark: async (req: Request, res: Response) => {
    const userId = req.user._id;
    const favoriteId = req.params.id;
    try {
      if (!Types.ObjectId.isValid(req.params.id)) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ success: false, message: "Apartment ID is not valid" });
      }
      const user = await User.findById(userId);
      const apartment = await Apartment.findById(favoriteId);      
      if (apartment) {
        if(user.favorites.includes(favoriteId)){
          return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
          });
        }
        user.favorites.push(apartment._id);
        await user.save();
        return res.status(httpStatus.OK).json({
          success: true,
          message: "Apartment added to favorites",
          apartment: apartment,
        });
      } else {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "Apartment not found",
        });
      }
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, message: error.message });
    }
  },
  list: async (req: Request, res: Response) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId).populate("favorites");
      return res
        .status(httpStatus.OK)
        .json({ success: true, favorites: user?.favorites || [] });
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, message: error.message });
    }
  },
};

export default controller;
