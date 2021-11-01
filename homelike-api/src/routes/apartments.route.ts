import { Router } from "express";
import passport from "passport";
import ApartmentController from "../controllers/apartment.controller";
import validator from "../midddlewares/validator";
import joiSchemas from "../config/joiSchemas";

const router: Router = Router();

router.get(
  "/",
  validator(joiSchemas.apartmentSEARCH, "query"),
  ApartmentController.search
);

router.get(
  "/:id",
  ApartmentController.searchById
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validator(joiSchemas.apartmentCREATE, "body"),
  ApartmentController.create
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validator(joiSchemas.apartmentUPDATE, "body"),
  ApartmentController.update
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ApartmentController.delete
);



export default router;
