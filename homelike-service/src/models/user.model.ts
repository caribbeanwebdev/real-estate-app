import { Schema, Document, model } from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  hash_password: string;
  salt: string;
  favorites: [string];
}

export interface IUserAuthJSON {
  first_name: string;
  last_name: string;
  name: string;
  email: string;
}

export default interface IUserModel extends Document, IUser {
  setPassword(password: string): void;
  validPassword(password: string): boolean;
  authJSON(): IUserAuthJSON;
  generateJWT(): string;
  name: string;
}

const schema = new Schema<IUserModel>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash_password: {
      type: String,
      private: true,
    },
    salt: {
      type: String,
      private: true,
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Apartment" }],
  },
  {
    timestamps: true,
  }
);

schema.virtual("name").get(function (this: IUserModel) {
  return `${this.first_name} ${this.last_name}`;
});

schema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash_password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

schema.methods.validPassword = function (password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash_password === hash;
};

schema.methods.generateJWT = function (): string {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
    },
    JWT_SECRET
  );
};

schema.methods.authJSON = function () {
  const { first_name, last_name, name, email } = this;
  return {
    name,
    first_name,
    last_name,
    email,
    token: this.generateJWT(),
  };
};

export const User = model<IUserModel>("User", schema);
