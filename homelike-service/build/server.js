"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = process.env.NODE_DOCKER_PORT || 3000;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const mongo_url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/`;
(async () => {
    try {
        console.log(mongo_url);
        mongoose_1.default
            .connect(mongo_url, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
            console.info("✅ Database connected successfully");
            app_1.default.listen(port, () => {
                console.log(`🚀 The application is listening on port ${port}!`);
            });
        })
            .catch((error) => {
            throw Error(`❌ Database Connection Error: ${error}`);
        });
    }
    catch (error) {
        throw Error(`❌ Server Connection Error: ${error}`);
    }
})();
//# sourceMappingURL=server.js.map