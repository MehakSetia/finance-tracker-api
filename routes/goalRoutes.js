const express=require('express');
const router=express.Router();
const {authenticationToken}=require('../middleware/authMiddleware');
const {addGoal,getGoals}=require('../controllers/goalController');

router.post('/add', authenticationToken,addGoal);

router.get('/',authenticationToken,getGoals)

module.exports= router;

