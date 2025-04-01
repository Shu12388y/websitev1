import mongoose from "mongoose";

export async function db(url: string) {
  try {
    await mongoose.connect(url);
    console.log("connected..");
  } catch (error) {
    console.log(error);
    console.log("Database connection error");
    return;
  }
}
