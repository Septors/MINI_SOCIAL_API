import prisma from "../lib/prisma.client.js";

const connectDb = async() =>{
    try{
        await prisma.$connect();
        console.log("database connected")
    }catch(err){
        console.error("database connection error",err)
        process.exit(1)
    }
}

export default connectDb;