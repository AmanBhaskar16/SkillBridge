import mongoose from "mongoose";

// Function to connect to mongodb

const connectDB = async () => {

  mongoose.connection.on('connected',()=>{
    console.log('Database connected');
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/SkillBridge`);

}

export default connectDB;