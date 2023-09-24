import mongoose from "mongoose";
import colors from "colors";

import dotenv from "dotenv";
dotenv.config();

import User from "./models/userModel.js";
import users from "./data/users.js";
import Products from "./models/productModel.js";

import products from "./data/products.js";

import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";
connectDB(); // connect to MongoDB

const importData = async () => {
   try {
      await Order.deleteMany();
      await User.deleteMany();
      await Products.deleteMany();

      const createdUsers = await User.insertMany(users);
      const adminUser = createdUsers[3]._id;

      const sampleProducts = products.map((product) => {
         return { ...product, user: adminUser };
      });

      await Products.insertMany(sampleProducts);

      console.log("Data Imported!".green.inverse);
      process.exit();
   } catch (error) {
      console.error(`${error}`);
      process.exit(1);
   }
};

const destroyData = async () => {
   try {
      await Order.deleteMany();
      await User.deleteMany();
      await Products.deleteMany();

      console.log("Data Destroyed!".red.inverse);
      process.exit();
   } catch (error) {
      console.error(`${error}`);
      process.exit(1);
   }
};

if (process.argv[2] === "-d") {
   destroyData();
} else {
   importData();
}
