const {connection}=require("../connection/connection")
const SELECT_PAYMENT=`SELECT * FROM payments`

const setPayment=async(req,res,next)=>{
    let{bkash,paypal,gcash,paytm,jazz,payoner,playstore,amazon}=req.body

        if(!bkash || !paypal || !gcash || !paytm || !jazz || !payoner || !playstore || !amazon){
            res.status(402).json({
                message:"All Value Is Required"
            })
        }else{
            try{
               bkash=parseInt(bkash)
               paypal=parseInt(paypal)
               gcash=parseInt(gcash)
               paytm=parseInt(paytm)
               jazz=parseInt(jazz)
               payoner=parseInt(payoner)
               playstore=parseInt(playstore)
               amazon=parseInt(amazon)

                let prevPayment=await connection.query(SELECT_PAYMENT);
                if(prevPayment.length>0){
                    let UPDATE_PAYMENTS = `UPDATE payments SET bkash=\'${bkash}\', paypal=\'${paypal}\', gcash=\'${gcash}\', paytm=\'${paytm}\', jazz=\'${jazz}\', payoner=\'${payoner}\', playstore=\'${playstore}\', amazon=\'${amazon}\' WHERE id=${prevPayment[0].id}`;

                    let result= await connection.query(UPDATE_PAYMENTS)
                        res.status(202).json({
                                message:"Setting Saved Successful"
                            })  
                }else{
                    let INSERT_PAYMENTS = `INSERT INTO payments( \`bkash\`, \`paypal\`, \`gcash\`, \`paytm\`, \`jazz\`, \`payoner\`, \`playstore\`, \`amazon\`) VALUES (\'${bkash}\',\'${paypal}\',\'${gcash}\',\'${paytm}\',\'${jazz}\',\'${payoner}\',\'${playstore}\',\'${amazon}\')`;

                    let result=await connection.query(INSERT_PAYMENTS);
                    res.status(202).json({
                        message:"Setting Added Successful"
                    })
                }
            }catch(err){
                res.json({
                   message:"Error"+err
                })
            }
        }
}

const updatePayment=async(req,res,next)=>{

    let{bkash,paypal,gcash,paytm,jazz,payoner,playstore,amazon}=req.body

     

    if(!(bkash || paypal || gcash || paytm || jazz || payoner || playstore || amazon)){
        res.status(402).json({
            message:"One Value Is Required"
        })
    }else{
        try{

            let prevPayment=await connection.query(SELECT_PAYMENT);
               
             bkash=bkash?parseInt(bkash):prevPayment[0].bkash;
             paypal=paypal?parseInt(paypal):prevPayment[0].paypal;
             gcash=gcash?parseInt(gcash):prevPayment[0].gcash;
             paytm=paytm?parseInt(paytm):prevPayment[0].paytm;
             jazz=jazz?parseInt(jazz):prevPayment[0].jazz;
             payoner=payoner?parseInt(payoner):prevPayment[0].payoner;
             playstore=playstore?parseInt(playstore):prevPayment[0].playstore;
             amazon=amazon?parseInt(amazon):prevPayment[0].amazon;
            let id=prevPayment[0].id;

            let UPDATE_PAYMENTS = `UPDATE payments SET bkash=\'${bkash}\', paypal=\'${paypal}\', gcash=\'${gcash}\', paytm=\'${paytm}\', jazz=\'${jazz}\', payoner=\'${payoner}\', playstore=\'${playstore}\', amazon=\'${amazon}\' WHERE id=${id}`;


            let result= await connection.query(UPDATE_PAYMENTS)

           res.status(202).json({
                message:"Setting Updated Successful"
            })


        }catch(err){
            res.json({
               message:"Error"+err
            })
        }
    
  
    }
}

const getPayment=async(req,res,next)=>{
    try{
        let payment=await connection.query(SELECT_PAYMENT);
        res.status(202).json({
            payment
        })


    }catch(err){
        res.json({
            message:"Error"+err
         })
    }
}


module.exports={
    setPayment,
    updatePayment,
    getPayment
}