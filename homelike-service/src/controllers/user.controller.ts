import { User } from "../models/user.model";
import { Request, Response } from "express";
import httpStatus from "http-status";

const controller = {
  register: async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (await User.findOne({ email })) {
        return res.status(httpStatus.CONFLICT).json({
          message: "User already exists"
        });
      }
      const user = new User({
        first_name,
        last_name,
        email,
      });
      user.setPassword(password);
      await user.save();
      res.json({success:true,...user.authJSON()});
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, message: error.message });
    }
  },
  authenticate: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !user.validPassword(password)) {
        res.status(httpStatus.UNAUTHORIZED).json({
          message: "Invalid email and password combination",
        });
      } else {
        res.json({success:true,...user.authJSON()});
      }
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, message: error.message });
    }
  },
};

export default controller;
