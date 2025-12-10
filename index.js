const express=require('express');
const app=express();
const port=3000;

const transRoutes = require('./routes/transaction');
const authRoutes = require('./routes/users');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the Finance Tracker API! 🚀");
});
app.use('/auth',authRoutes);
app.use('/transaction',transRoutes);

app.listen(port,()=>{
    console.log(`Finance tracker running at api http://localhost:${port}`);
});