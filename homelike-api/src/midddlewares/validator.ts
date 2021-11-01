import Joi from "joi";
import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

const middleware = (schema: Joi.ObjectSchema<any>, property: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let data: Object;
    switch (property) {
      case "body":
        data = req.body;
        break;
      case "query":
        data = req.query;
        break;
    }
    const { error } = schema.validate(data);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: message });
    }
  };
};
export default middleware;
