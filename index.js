import express from "express";
import {mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import product from "./Routes/products.js";
import category from "./Routes/category.js";
 import auth from "./Routes/auth.js";


 const app = express();
 app.use(express.json());


 app.get("/", (req, res) => {
   res.send("hi there this is backed");
 });

 app.use('/auth', auth);


app.use("/products", product);
app.use("/category", category);

//moogodb connection
 mongoose.connect(mongoDBURL).then(() => {
  console.log(`Connected to MongoDB`);
  app.listen(5555, () => {
    console.log(`Server listening on port: 5555`);
  });
})
.catch((error) => {
  console.log(error);
})