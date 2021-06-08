const router=require('express').Router()
const {paidWithdraw,addNewWithDraw,getWithDraw,userWithDraw,singleUserWithDraw,deleteWithDraw,getActiveOrder, getPaidOrder}=require('../controller/instanceWithdrawController')
const authentication =require('../auth/authentication')

router.post('/',authentication,addNewWithDraw)
router.get('/',authentication,getActiveOrder)
router.get('/p',authentication,getPaidOrder)
router.post('/p/:wId',paidWithdraw)

router.get('/:id',authentication,singleUserWithDraw)
router.get('/u/single',authentication,userWithDraw)
router.delete('/:withdrawId',authentication,deleteWithDraw)

module.exports=router;