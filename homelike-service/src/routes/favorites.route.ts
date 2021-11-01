import { Router } from "express";
import passport from 'passport'
import FavoriteController from "../controllers/favorite.controller";

const router: Router = Router();

router.post("/:id",passport.authenticate('jwt', { session: false }),FavoriteController.mark);

router.get("/",passport.authenticate('jwt', { session: false }), FavoriteController.list);

export default router;
