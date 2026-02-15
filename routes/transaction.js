const authenticationToken=require('../middleware/auth');
const express=require('express');
const router=express.Router();
const { PrismaClient }=require('@prisma/client');
const prisma=new PrismaClient();

router.get('/summary',authenticationToken,async (req,res)=>{
    try{
        console.log("Calculating summary");
        const result=await prisma.transaction.aggregate({
            where:{ userId:req.user.userId},
            _sum:{
                amount:true
            }
        });
        const totalAmount=result._sum ?? 0;
        console.log("Result from DB: ",result);
        res.json({amount:totalAmount});
    }
    catch(error){
        res.status(500).json({error:"Failed to generate summary"});
    }
});

router.get('/',authenticationToken,async (req,res)=>{
    try{
        const {category}=req.query;
        const allTrans=await prisma.transaction.findMany({
            where:{
                userId:req.user.userId,
                ...(category && {category})
            }
        });
        res.json(allTrans);
    }
    catch(error){
        res.status(500).json({error:'Failed to fetch transactions'});
    }
});

router.get('/:id',authenticationToken,async (req,res)=>{
    try{
        const { id }=req.params;
        const trans=await prisma.transaction.findFirst({
            where:{
                id:parseInt(id),
                userId:req.user.userId
            }
        });
        if(trans){
            res.json(trans);
        }
        else{
            res.status(404).json({error:"Transaction not found"});
        }
    }
    catch(error){
        res.status(500).json({error:"Failed to fetch transaction"});
    } 
});

router.post('/',authenticationToken,async (req,res)=>{
    try{
        const { name,amount,category,description }=req.body;
        const newTransaction=await prisma.transaction.create({
        data:{ name,amount,category,description,userId:req.user.userId}
             });
        res.status(201).json(newTransaction);
    }
    catch(error){
        console.error("❌ POST ERROR:", error);
        res.status(500).json({error:"Failed to create transaction"});
    }
});


router.put('/:id',authenticationToken,async (req,res)=>{
    try{
        const { id }=req.params;
        const { name,amount,category,description}=req.body;
        const updatedTransaction=await prisma.transaction.update({
            where:{
                id:parseInt(id),
            },
            data:{name,amount,category,description}
        });
        res.status(200).json(updatedTransaction);
    }
    catch(error){
        res.status(500).json({error:"Failed to update transaction"});
    }
});

router.delete('/:id',authenticationToken,async (req,res)=>{
    try{
    const { id }=req.params;
    const deleted=await prisma.transaction.deleteMany({
        where:{
            id:parseInt(id),
            userId:req.user.userId
        }
    });
    if(deleted.count===0){
        return res.status(403).json("You are not allowed");
    }
    res.status(200).json("Deleted Transaction");
     }
     catch(error){
        res.status(500).json({error:"Failed to delete transaction"});
     }
});

module.exports=router;