const router=require('express').Router()
const authentication =require('../auth/authentication')

const {saveNewVersion,updateNewVersion,getVersion}=require('../controller/versionController')

router.get('/',getVersion)
router.post('/',saveNewVersion)
router.put('/',updateNewVersion)




module.exports=router;