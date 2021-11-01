import { Schema, Document, model, Types } from "mongoose";

export interface IApartment {
  name: string;
  description: string;
  price: number;
  address: string;
  city: string;
  country: string;
  rooms: number;
  createdby: string;
  location: {
    type: string;
    coordinates: number[];
  };
}

export default interface IApartmentModel extends Document, IApartment {}

const ApartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      type: String,
      maxlength: 100,
    },
    city: {
      type: String,
      required: true,
      maxlength: 50,
    },
    country: {
      type: String,
      required: true,
      maxlength: 50,
    },
    rooms: {
      type: Number,
      required: true,
      min: 1,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
ApartmentSchema.index({ location: "2dsphere" });
const Apartment = model<IApartmentModel>("Apartment", ApartmentSchema);

export { Apartment,ApartmentSchema };
