import { Router, Request, Response } from "express";
import userRouter from "./users.route";
import apartmentRouter from "./apartments.route";
import favoriteRouter from "./favorites.route";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger";
import graphQLRouter from "./graphql.route";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("OK!");
});

router.use('/swagger', swaggerUI.serve);
router.get('/swagger', swaggerUI.setup(swaggerDocument));

router.use("/graphql", graphQLRouter);

router.use("/users", userRouter);
router.use("/apartments", apartmentRouter);
router.use("/favorites", favoriteRouter);

export default router;
