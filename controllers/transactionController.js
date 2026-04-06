const { PrismaClient }=require('@prisma/client');
const prisma=new PrismaClient();
const transSchema=require('../validators/transactionSchema');


const newTrans=async (req,res,next)=>{
    try{
        const { name,amount,category,description,type}=req.body;
        transSchema.parse(req.body);
        const newTransaction=await prisma.transaction.create({
        data:{ name,amount,category,description,type,userId:req.user.userId}
             });
        res.status(201).json(newTransaction);
    }
    catch(err){
       next(err);
    }
};


const getTrans= async (req,res,next)=>{
    try{
        const { id }=req.params;
        const trans=await prisma.transaction.findFirst({
            where:{
                id:parseInt(id),
                userId:req.user.userId
            }
        });
        if(!trans){
            const err=new Error("Transaction not found");
            err.statusCode=404;
            return next(err);
        }
        return res.status(200).json(trans);
    }
    catch(err){
        next(err);
    } 
};

const getTransByCategory=async (req,res,next)=>{

const page=parseInt(req.query.page) || 1;
const limit=parseInt(req.query.limit) || 10;
const skip=(page-1)*limit;
    try{
        const {category}=req.query;
        const allTrans=await prisma.transaction.findMany({
            where:{
                userId:req.user.userId,
                ...(category && {category})
            },
            skip,
            take:limit
        });

        const total=await prisma.transaction.count({
            where:{
                userId:req.user.userId,
                ...(category && {category})
            }
        });

        if(allTrans.length===0){
            const err=new Error("Transaction not found");
            err.statusCode=404;
            return next(err);
        }
        res.status(200).json({total,page,limit,transactions:allTrans});
    }
    catch(err){
        return next(err);
    }
};

const getDashboard=async(req,res,next)=>{
    try{
        const userId=req.user.role==='Admin' ||req.user.role==='Analyst' ? undefined : req.user.userId;
        const allTrans=await prisma.transaction.findMany({
            where:{
                ...(userId && {userId})
            }
        });
        
        const totalIncome=allTrans.filter(t=>t.type==='income').reduce((sum,t)=>sum+t.amount,0);

        const totalExpense=allTrans.filter(t=>t.type==="expense").reduce((sum,t)=>sum+t.amount,0);

        const netBalance=totalIncome-totalExpense;

        const categoryTotal=allTrans.reduce((acc,t)=>
        {
            acc[t.category]=(acc[t.category] || 0) + t.amount
            return acc
        },{});

        const recentTransaction=allTrans.sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);

        res.status(200).json({totalIncome,totalExpense,netBalance,categoryTotal,recentTransaction});
    }
    catch(err){
        next(err);
    }
}

const getTransAll=async(req,res,next)=>{

const page=parseInt(req.query.page) || 1;
const limit=parseInt(req.query.limit) || 10;
const skip=(page-1)*limit;
    try{
        const {id}=req.query;
    
        const allTrans=await prisma.transaction.findMany({
            where:{
               ...(id && {userId:parseInt(id)})
            },
            orderBy:{date:'desc'},
            skip,
            take:limit
        });
        if(allTrans.length===0){
            const error=new Error("Transaction not found");
            error.statusCode=404;
            return next(error);
        }
        
        const total=await prisma.transaction.count({
            where:{
                ...(id && {userId:parseInt(id)})
            }
        })
        return res.status(200).json({total,page,limit,transactions:allTrans});
    }
    catch(err){
        return next(err);
    }
}

const updateTrans=async (req,res,next)=>{
    try{
        const { id }=req.params;
        const { name,amount,category,description}=req.body;
        transSchema.parse(req.body);
        const updatedTransaction=await prisma.transaction.updateMany({
            where:{
                id:parseInt(id),
                userId:req.user.userId
            },
            data:{name,amount,category,description}
        });
        
        if(updatedTransaction.count===0){
            const err=new Error("Transaction not found or not authorised");
            err.statusCode=404;
            return next(err);
        }

        const updated=await prisma.transaction.findFirst({
            where:{
                id:parseInt(id),
                userId:req.user.userId
            }
        });
        return res.status(200).json(updated);
        
    }
    catch(err){
        return next(err);
    }
};

const deleteTrans=async (req,res,next)=>{
    try{
    const { id }=req.params;
    const deleted=await prisma.transaction.deleteMany({
        where:{
            id:parseInt(id),
            userId:req.user.userId
        }
    });
    if(deleted.count===0){
        const err=new Error("Transaction not found or not authorised");
        err.statusCode=404;
        return next(err);
    }
    res.status(200).json("Deleted Transaction");
     }
     catch(err){
        return next(err);
     }
};

module.exports={
    newTrans,getTransByCategory,getTrans,updateTrans,deleteTrans,getDashboard,getTransAll
};
