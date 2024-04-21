import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        console.log('Database is connected');
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB connected Successfully");
        })

        connection.on('error', (err) =>{
            console.log('MongoDB connection error. Please Make sure MongoDB is running. '+ err);
            process.exit();
        })

    } catch (error) {
        console.log("Something Went Wrong!");
        console.log(error);
    }
}