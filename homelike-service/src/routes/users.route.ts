import { Router } from "express";
import validator from "../midddlewares/validator";
import schemas from "../config/joiSchemas";
import UserController from "../controllers/user.controller";

const router: Router = Router();

router.post(
  "/register",
  validator(schemas.userREGISTER, "body"),
  UserController.register
);

router.post(
  "/authenticate",
  validator(schemas.userAUTHENTICATE, "body"),
  UserController.authenticate
);

export default router;
