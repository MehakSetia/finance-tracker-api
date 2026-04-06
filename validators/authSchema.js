const z=require('zod');

const registerSchema=z.object({
    email:z.email(),
    password:z.string().min(8),
    name:z.string()
});

const loginSchema=z.object({
    email:z.email(),
    password:z.string().min(8)
});

module.exports={registerSchema,loginSchema};