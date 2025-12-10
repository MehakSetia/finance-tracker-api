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
        console.log("Result from DB: ",result);
        res.json(result._sum);
    }
    catch(error){
        res.status(500).json({error:"Failed to generate summary"});
    }
});

router.get('/',authenticationToken,async (req,res)=>{
    try{
        const allTrans=await prisma.transaction.findMany({
            where:{userId:req.user.userId}
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
        const trans=await prisma.transaction.findUnique({
            where:{
                id:parseInt(id)
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
        const updatedTransaction=await prisma.transaction.findUnique({
            where:{
                id:parseInt(id),
                data:{name,amount,category,description}
            }
        });
        res.status(updatedTransaction);
    }
    catch(error){
        res.status(500).json({error:"Failed to update transaction"});
    }
});

router.delete('/:id',authenticationToken,async (req,res)=>{
    try{
    const { id }=req.params;
    await prisma.transaction.delete({
        where:{
            id:parseInt(id)
        }
    });
    res.sendStatus(204);
     }
     catch(error){
        res.status(500).json({error:"Failed to delete transaction"});
     }
});

module.exports=router;