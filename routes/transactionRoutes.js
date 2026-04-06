const express=require('express');
const router=express.Router();

const {newTrans,getTransByCategory,getTrans,getDashboard,updateTrans,deleteTrans,getTransAll}=require('../controllers/transactionController');
const {authenticationToken,authorizeRoles}=require('../middleware/authMiddleware');

router.post('/add',authenticationToken,authorizeRoles('Admin','User'),newTrans);
router.get('/dashboard',authenticationToken,getDashboard);
router.get('/all',authenticationToken,authorizeRoles('Admin','Analyst'),getTransAll);
router.get('/',authenticationToken,getTransByCategory);
router.get('/:id',authenticationToken,getTrans);
router.put('/:id',authenticationToken,authorizeRoles('Admin','User'),updateTrans);
router.delete('/:id',authenticationToken,authorizeRoles('Admin','User'),deleteTrans);

module.exports=router;
