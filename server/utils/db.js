import mongoose from "mongoose";

const connectDB = async() => {
    try {
        
        await mongoose.connect('mongodb+srv://raghuwanshiaditi6:PkFQOxNrVRBlRAXM@cluster0.pfer16l.mongodb.net/jobPortal?retryWrites=true&w=majority&appName=Cluster0');
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
        console.log("mongo db conntion error")
    }
}
export default connectDB;