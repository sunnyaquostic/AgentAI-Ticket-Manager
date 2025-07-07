import mongoose from "mongoose";

export const connectMongoDatabase = () => {
    mongoose.connect(process.env.MONGO_URI)
     .then((data) => {
        console.log(`MongoDB connected with server ${data.connection.host}`)
     })
     .catch((err) => ("MongoDB connection error: ", err))
}