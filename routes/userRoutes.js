const router=require('express').Router()

const {updateUserCoinFromAdmin,updateUserData,updateUserProfile,loginUser,signUpUser,setCoins,deleteCoin,getUsers,getSingleUser,getSingleUser2}=require('../controller/userController')
const authentication =require('../auth/authentication')

router.get('/',authentication,getUsers)

router.get('/single',authentication,getSingleUser)
router.get('/:userId',authentication,getSingleUser2)

router.post('/signup',signUpUser)
router.post('/login',loginUser)
router.post('/coin',authentication,setCoins)
router.put('/',authentication,updateUserData)
router.put('/edit/:userId',authentication,updateUserCoinFromAdmin)


router.put('/profile',authentication,updateUserProfile)

router.delete('/coin',authentication,deleteCoin)



module.exports=router;