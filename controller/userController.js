const {connection}=require('../connection/connection')
const jwt=require('jsonwebtoken')

const SELECT_USER="SELECT * FROM users";
const SELECT_SETTINGS="SELECT * FROM settings";


 const signUpUser=async(req,res,next)=>{
     let{myRefer,refer,name,phone,email,password,deviceId}=req.body
    try{
         if(!name){
       res.json({
           message:"Name is Required"
       })
    }
    else if(!phone){
        res.json({
            message:"Phone is Required"
        })
    }

    else if(phone.length>11){
        res.json({
            message:"Invalid Phone Number"
        })  
    }

    else if(!email){
        res.json({
            message:"Email is Required"
        })
    }
   else  if(!password){
        res.json({
            message:"Password is Required"
        })
    }
    else if(!deviceId){
        res.json({
            message:"Send All The Filed"
        })
    }else if(!myRefer){
        res.json({
            message:"Send All The Filed"
        })
    }else{
        try{
         let SELECT_PREV_USER=`SELECT * FROM users WHERE deviceId=\'${deviceId}\' OR email=\'${email}\' OR phone=\'${phone}\'`
        let existsUser=await connection.query(SELECT_PREV_USER);
        if(existsUser.length>0){
            res.json({
                message:"User Already Exists."
            })
        }else{       

        let setting=await connection.query(SELECT_SETTINGS);
        
         if(refer){
            
             let SELECT_REFER_USER=`SELECT * FROM users WHERE myRefer=\'${refer}\'`
           let referUser=await connection.query(SELECT_REFER_USER);
           if(referUser.length!=0){
                let bons=setting&&setting.length!=0?setting[0].refer:0
                let refNewCoin=parseInt(bons)+parseInt(referUser[0].coins);
               let coin=setting&&setting.length!=0?setting[0].regCoin:0;
                let INSERT_USERS = `INSERT INTO users( \`name\`, \`phone\`, \`email\`, \`password\`, \`coins\`, \`deviceId\`, \`myRefer\`) VALUES (\'${name}\',\'${phone}\',\'${email}\',\'${password}\',\'${coin}\',\'${deviceId}\',\'${myRefer}\')`;
                let UPDATE_REF_USER = `UPDATE users SET coins=\'${refNewCoin}\' WHERE id=${referUser[0].id}`;
                let user=await connection.query(INSERT_USERS);
                let updateUser=await connection.query(UPDATE_REF_USER);
                    res.status(200).json({
                        message:"Signup Success"
                    })
            }else{
                try{
                let setting=await connection.query(SELECT_SETTINGS);
               let coin=setting&&setting.length!=0?setting[0].regCoin:0;
               let INSERT_USERS = `INSERT INTO users( \`name\`, \`phone\`, \`email\`, \`password\`, \`coins\`, \`deviceId\`, \`myRefer\`) VALUES (\'${name}\',\'${phone}\',\'${email}\',\'${password}\',\'${coin}\',\'${deviceId}\',\'${myRefer}\')`;
               
                let user=await connection.query(INSERT_USERS);
                    res.status(200).json({
                        message:"Signup Success"
                    })}catch(err){
                        res.status(404).json({
                            message:"Error",
                            err
                        })
                    }
            }
        }else{
            try{
            let coin=setting&&setting.length!=0?setting[0].regCoin:0;
          let INSERT_USERS = `INSERT INTO users( \`name\`, \`phone\`, \`email\`, \`password\`, \`coins\`, \`deviceId\`, \`myRefer\`) VALUES (\'${name}\',\'${phone}\',\'${email}\',\'${password}\',\'${coin}\',\'${deviceId}\',\'${myRefer}\')`;
              
            let user=await connection.query(INSERT_USERS);
                res.status(200).json({
                    message:"Signup Success"
                })
            }catch(err){
                res.status(404).json({
                    message:"Error",
                    err
                })
            }
        }
       }
        }catch(err){
            res.status(404).json({
                message:"Error",
                err
            })
        }
    }
}catch(err){
    if(err.keyValue.email){
        res.status(404).json({
            message:"Email Already Used"
        })
    }
    if(err.keyValue.phone){
        res.status(404).json({
            message:"Phone Already Used"
        })
    }
    if(err.keyValue.deviceId){
        res.status(404).json({
            message:"This Device Already Have An Account"
        })
    }

    res.status(404).json({
        message:"Error",
        err
    })
}





}
const loginUser=async(req,res,next)=>{

    const {email,password}=req.body
   if(!email){
        res.json({
            message:"Email is Required"
        })
    }
    if(!password){
        res.json({
            message:"Password is Required"
        })
    }
    try{
     
    const SELECT_LOGIN_USER = `SELECT * FROM  users WHERE email=\'${email}\' AND password=\'${password}\'`;
    const databaseUser=await connection.query(SELECT_LOGIN_USER);
    
       if(databaseUser.length>0){
                const token=jwt.sign({
                    name:databaseUser[0].name,
                    userId:databaseUser[0].id,
                    phone:databaseUser[0].phone
                },process.env.JWT_SECRET,{
                    expiresIn:"7d"
                })
           res.status(200).json({
                    "access_token":token,
                    "message":"Login successful"
                })
            }else{
                res.status(402).json({
                    message:"Authentication Failed"
                })
        }
    
    }catch(err){
        res.status(404).json({
            err
        })
    }






}
const setCoins=async(req,res,next)=>{
    
    let {coin,text,time}=req.body;

    if(!coin || !text || !time){
        res.json({
            message:"All is Required"
        })
    }

    coin=parseInt(coin);

    try{
        const SELECT_SP_USER = `SELECT * FROM  users WHERE id=\'${req.userId}\'`;
        let user=await connection.query(SELECT_SP_USER);
        const newCoin=coin+user[0].coins;
        const UPDATE_USER = `UPDATE users SET coins=\'${newCoin}\' WHERE id=${req.userId}`;
       
        let result=await connection.query(UPDATE_USER);
       
        
        let INSERT_EARNINGS = `INSERT INTO earnings( \`earningText\`, \`userId\`, \`previousBalance\`, \`newBalance\`, \`time\`) VALUES (\'${text}\',\'${user[0].id}\',\'${user[0].coins}\',\'${newCoin}\',\'${time}\')`;
       
       let earningHistory= await connection.query(INSERT_EARNINGS);
        res.status(200).json({
            message:"Coin Added Successful",
        })
        
    }catch(err){
        res.status(404).json({
            message:"error Occurred",
            err
        })
    }
}
const deleteCoin=async(req,res,next)=>{
    let {coin}=req.body;
    if(!coin){
        res.json({
            message:"Coin is Required"
        })
    }

    coin=parseInt(coin);

    try{
        const SELECT_SP_USER = `SELECT * FROM  users WHERE id=\'${req.userId}\'`;
        let user=await connection.query(SELECT_SP_USER);
        let newCoin=user[0].coins>coin?user[0].coins-coin:0;
        const UPDATE_USER = `UPDATE users SET coins=\'${newCoin}\' WHERE id=${req.userId}`;
       
        let result=await connection.query(UPDATE_USER)
        res.status(200).json({
            message:"Coin Remove Successful",
            result
        })
    }catch(err){
        res.status(404).json({
            message:"error Occurred",
            err
        })
    }
}
const getUsers=async(req,res,next)=>{
   
   try{
        let users=await connection.query(SELECT_USER);
        res.status(200).json({
            users
        })
   }catch(err){
       res.status(400).json({
           message:"Error"
       })
   }
   
}
const getSingleUser=async(req,res,next)=>{

   try{
    const SELECT_SP_USER = `SELECT * FROM  users WHERE id=\'${req.userId}\'`;
        let users=await connection.query(SELECT_SP_USER);
        res.status(200).json({
            users
        })
   }catch(err){
       res.status(400).json({
           message:"Error"
       })
   }
   
}
const getSingleUser2=async(req,res,next)=>{
   try{
         const SELECT_SP_USER = `SELECT * FROM  users WHERE id=\'${req.params.userId}\'`;
         let users=await connection.query(SELECT_SP_USER);
         res.status(200).json({
            users
        })
   }catch(err){
       res.status(400).json({
           message:"Error"
       })
   }
   
}
const updateUserProfile=async(req,res,next)=>{
   try{
    const UPDATE_USER = `UPDATE users SET profileImage=\'${req.body.profileImage}\' WHERE id=${req.userId}`;
      
    let uUser=await connection.query(UPDATE_USER);
    res.status(200).json({
        message:"Profile Image Updated Successful"
    })
    }catch(err){
        res.status(400).json({
            message:"Error"
        })
    }
}

const updateUserCoinFromAdmin=async(req,res,next)=>{
    let userId=req.params.userId;
    try{
    let {coins}=req.body
    const UPDATE_USER = `UPDATE users SET coins=\'${coins}\' WHERE id=${userId}`;
    let uUser=await connection.query(UPDATE_USER)

    res.status(200).json({
        message:"Updated Success"
    })
}catch(err){
    res.status(400).json({
        message:"Error"
    })
}



}
const updateUserData=async(req,res,next)=>{
    let userId=req.userId;
    try{
    let {cap1LastPlay,cap2LastPlay,cap3LastPlay,cap4LastPlay,watchLastPlay,videoState}=req.body
  
    const SELECT_SP_USER = `SELECT * FROM  users WHERE id=\'${userId}\'`;
    let user=await connection.query(SELECT_SP_USER);
   
    cap1LastPlay=cap1LastPlay?parseInt(cap1LastPlay):user[0].cap1LastPlay;
    cap2LastPlay=cap2LastPlay?parseInt(cap2LastPlay):user[0].cap2LastPlay;
    cap3LastPlay=cap3LastPlay?parseInt(cap3LastPlay):user[0].cap3LastPlay;
    cap4LastPlay=cap4LastPlay?parseInt(cap4LastPlay):user[0].cap4LastPlay;
    watchLastPlay=watchLastPlay?parseInt(watchLastPlay):user[0].watchLastPlay;
    videoState=videoState?parseInt(videoState):user[0].videoState;


    let update={
        cap1LastPlay,cap2LastPlay,cap3LastPlay,cap4LastPlay,watchLastPlay,videoState
    }

    let UPDATE_USER = `UPDATE users SET cap1LastPlay=\'${cap1LastPlay}\', cap2LastPlay=\'${cap2LastPlay}\',cap3LastPlay=\'${cap3LastPlay}\',cap4LastPlay=\'${cap4LastPlay}\',watchLastPlay=\'${watchLastPlay}\',videoState=\'${videoState}\' WHERE id=${userId}`

    let uUser=await connection.query(UPDATE_USER)

    res.status(200).json({
        message:"Updated Success"
    })
}catch(err){
    res.status(400).json({
        message:"Error"
    })
}



}



module.exports={
    loginUser,
    signUpUser,
    setCoins,
    deleteCoin,
    getUsers,
    getSingleUser,
    getSingleUser2,
    updateUserProfile,
    updateUserData,
    updateUserCoinFromAdmin
}