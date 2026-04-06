const { success } = require("zod");

const erroHandler=(err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    res.status(statusCode).json({
        success:false,
        message:err.message || "Internal Server Error"
    })
}

module.exports=erroHandler;