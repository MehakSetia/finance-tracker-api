const jwt=require('jsonwebtoken');
const express=require('express');
const router=express.Router();
const { PrismaClient }=require('@prisma/client');
const bcrypt=require('bcryptjs');
const prisma=new PrismaClient();

router.post('/register',async (req,res)=>{
    try{
        const{ name,email,password }=req.body;

        const existingUser=await prisma.user.findUnique({
            where:{ email }
        });
        if(existingUser){
            return res.status(400).json({error:"User already exists"});
        }
        const hashedPass=await bcrypt.hash(password,10);

        const newUser=await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPass
            }
        });
        return res.status(201).json({message:"User created",user:newUser});
    }
    catch(error){
        res.status(500).json({error:"Registration failed"});
    }
});

router.post('/login',async (req,res)=>{
   try{
    const{ email,password }=req.body;
    const user=await prisma.user.findUnique({
        where:{ email }
    });
    if(!user){
        return res.status(400).json({error:"Invalid email or password"});
    }
    const isPassValid=await bcrypt.compare(password,user.password);

    if(!isPassValid){
        return res.status(400).json({error:"Invalid email or password"});
    }

    const token=jwt.sign(
        {userId:user.id},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
    res.json({message:"Login successful",token});
   }
   catch(error){
    console.error(error);
    res.status(500).json({error:"Login Failed"});
   }
})

module.exports=router;