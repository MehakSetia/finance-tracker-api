const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();


const addGoal=async(req,res,next)=>{
    try{
        const{name,amount}=req.body;
        const saveGoal=await prisma.goal.create({
            data:{
                name,
                amount:parseFloat(amount),
                userId:req.user.userId
            }
        });
        return res.status(201).json(saveGoal);
    }
    catch(error){
        return next(error);
    }
};

const getGoals=async (req,res)=>{
    try{
        const goals=await prisma.goal.findMany({
             where:{
                userId:req.user.userId
             }
        });
        if(goals.length===0){
            const error=new Error("No goals found");
            error.statusCode=404;
            return next(error);
        }
        res.status(200).json(goals);
    }
    catch(error){
        console.error("GET GOALS: ",error);
        res.status(500).json({error:"Failed to get goals"});
    }
};

module.exports={addGoal,getGoals};