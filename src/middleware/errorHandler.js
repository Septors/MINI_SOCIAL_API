export default function errorHandler(error,req,res,next){
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    console.error(`[${req.method} ${req.originalUrl}] >> ${statusCode}:${message} `);

    res.status(statusCode).json({
        success:false,
        message
    })
}