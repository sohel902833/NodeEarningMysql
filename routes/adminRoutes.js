const router=require('express').Router()
const authentication =require('../auth/authentication')
const {loginAdmin,getEarningHistory,getUserEarningHistory}=require("../controller/adminController")

const {setAppSettings,getAppSettings,updateAppSettings}=require('../controller/adminController')
const {setPayment,getPayment,updatePayment}=require('../controller/paymentSettingController')

router.post('/login',loginAdmin)
router.get('/history',getEarningHistory)
router.get('/history/:userId',getUserEarningHistory)

router.get('/setting',getAppSettings)
router.post('/setting',setAppSettings)
router.put('/setting',updateAppSettings)

router.post('/payment',setPayment)
router.put('/payment',updatePayment)
router.get('/payment',getPayment)



module.exports=router;