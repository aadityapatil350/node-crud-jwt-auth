import { text } from "express";
import mongoose from "mongoose";

const categorySchema =  mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  
},{
    timestamps: true,
  },);

  const Category = mongoose.model('category', categorySchema);

  export default Category; 
