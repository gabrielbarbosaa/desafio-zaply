import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({versionKey: false})
export class Product extends Document {
  @Prop({required: true, type: String, name: 'name'})
  name: string;

  @Prop({required: true, type: Number, name: 'price'})
  price: number;

  @Prop({type: String, name: 'image', nullable: true})
  image: string;

  @Prop({required: true, type: String, name: 'brand'})
  brand: string;

  @Prop({required: true, type: String, name: 'categories'})
  categories: string;
} 

export const ProductSchema = SchemaFactory.createForClass(Product);