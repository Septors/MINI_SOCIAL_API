import dotenv from "dotenv";
import connectDb from "./config/connect.db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () =>{
    try{
        await connectDb();

        app.listen(PORT,() =>{
            console.log(`Server running in PORT: ${PORT}`)
        })
    }catch(err){
        console.error("Server error",err);
    };
};

start();