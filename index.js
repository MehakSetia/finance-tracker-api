const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./swagger.yaml');
require('dotenv').config();

const express=require('express');
const app=express();
const port=3000;


const transRoutes = require('./routes/transaction');
const authRoutes = require('./routes/users');
// const goalRoutes=require('./routes/goals');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the Finance Tracker API! 🚀");
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth',authRoutes);
app.use('/transaction',transRoutes);
// app.use('/goals',goalRoutes);

app.listen(port,()=>{
    console.log(`Finance tracker running at api http://localhost:${port}`);
});