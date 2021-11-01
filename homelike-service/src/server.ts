import "dotenv/config";
import app from "./app";
import mongoose, { ConnectOptions } from "mongoose";

const port = process.env.SERVER_PORT;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const mongo_url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/`;

(async () => {
  try {
    mongoose
      .connect(mongo_url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
      } as ConnectOptions)
      .then(() => {
        app.listen(port, () => {
          console.log(`🚀 The application is listening on port ${port}!`);
        });
      })
      .catch((error) => {
        throw Error(`❌ Database Connection Error: ${error}`);
      });
  } catch (error) {
    throw Error(`❌ Server Connection Error: ${error}`);
  }
})();
