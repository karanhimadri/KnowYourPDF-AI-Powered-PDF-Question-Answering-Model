import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGO_URI}/mearn-auth`);
    mongoose.connection.on("connected", () => {
      console.log("Database connection successfull !!");
    });
  } catch (error) {
    console.log("MongoDB connection failed :: ", error.message);
  }
};

export default connectDB;

// in the above some changes are followed by GreatStack
