import express, { json } from "express";
import cors from "cors";
import routes from "./routes";
import passport from "passport";
import { anonymousStrategy, jwtStrategy } from "./config/passport";

const app = express();

app.use(cors());

app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(anonymousStrategy);

app.use(json());

app.use("/api", routes);

export default app;
