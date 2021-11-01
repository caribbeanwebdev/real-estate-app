import { Router, Request, Response } from "express";
import userRouter from "./users.route";
import apartmentRouter from "./apartments.route";
import favoriteRouter from "./favorites.route";

const router: Router = Router();

router.get("/health-check", (req: Request, res: Response) => {
  res.send("OK!");
});

router.use("/users", userRouter);
router.use("/apartments", apartmentRouter);
router.use("/favorites", favoriteRouter);

export default router;
