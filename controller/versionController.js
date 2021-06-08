const {connection} =require('../connection/connection')
const SELECT_VERSIONS=`SELECT * FROM versions`

const saveNewVersion=async(req,res,next)=>{

    let {versionNo,priority}=req.body
    console.log(req.body)
    if(versionNo && priority){
        try{
            priority=parseInt(priority)
            let prevVersion=await  connection.query(SELECT_VERSIONS);
          
             if(prevVersion && prevVersion.length!=0){
                 console.log("update")
                let UPDATE_QUERY = `UPDATE versions SET versionNo=\'${versionNo}\', priority=\'${priority}\' WHERE id=${prevVersion[0].id}`;
              let updatedVersion=await connection.query(UPDATE_QUERY)
                  res.status(200).json({
                    message:"Version Saved Success"
                }) 
            }else{
                console.log("new")
                const INSERT_VERSION=`INSERT INTO versions( \`versionNo\`, \`priority\`) VALUES (\'${versionNo}\',\'${priority}\')`
                 let version1=await connection.query(INSERT_VERSION)

                res.status(200).json({
                    message:"Version Saved Success"
                }) 
            }

    }catch(err){
        res.status(404).json({
            message:"Server Error",
            err
        }) 
    }

    }else{
        res.status(402).json({
            message:"All The Filed Is Required"
        })
    }



}

const updateNewVersion=async(req,res,next)=>{
    let {versionNo,priority}=req.body

    if(versionNo || priority){
        try{
            let prevVersion=await  connection.query(SELECT_VERSIONS);
            priority=priority?parseInt(priority):prevVersion[0].priority;
            let UPDATE_QUERY = `UPDATE versions SET versionNo=\'${versionNo}\', priority=\'${priority}\' WHERE id=${prevVersion[0].id}`
              
            let id=prevVersion[0].id;
           let result= await connection.query(UPDATE_QUERY)
           res.status(202).json({
                message:"Version Updated Successful"
            })



        }catch(err){
            res.status(404).json({
                message:"Server Error"
            }) 
        }
    }else{
        res.status(402).json({
            message:"One Filed Is Required"
        })
    }




}
const getVersion=async(req,res,next)=>{
   try{
        let version=await connection.query(SELECT_VERSIONS);
        res.status(200).json({
                 version
                })
   
       
    }catch(err){
        res.status(404).json({
            message:"not found",
            err
        })
    }
   
}

module.exports={
    saveNewVersion,updateNewVersion,getVersion
}