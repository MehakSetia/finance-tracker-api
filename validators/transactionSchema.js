const z=require('zod');

const transSchema=z.object({
    type:z.enum(
        ['income','expense']
    ),
    name:z.string(),
    amount:z.number(),
    category:z.string(),
    description:z.string(),
    date:z.string().datetime().optional()
});

module.exports=transSchema;