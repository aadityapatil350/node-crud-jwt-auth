import mongoose from "mongoose";

const productSchema =  mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  packetSize: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false, // Assuming image is optional
  },
  status: {
    type: Boolean,
    required: true,
  },
  
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category', // Replace 'Category' with your actual category model name
//     required: true,
//   },
},{
    timestamps: true,
  },);

  const Product = mongoose.model('product', productSchema);

  export default Product; 
