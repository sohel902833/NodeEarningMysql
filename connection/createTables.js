const {connection} =require('./connection')

const createTables=async()=>{
    const CREATE_USER_TABLE=`
                 CREATE TABLE if not exists Users(
                     id INT(110) PRIMARY KEY AUTO_INCREMENT,
                     name varchar(50) NOT NULL,
                     phone varchar(50) NOT NULL,
                     email varchar(50) NOT NULL,
                     deviceId varchar(120) NOT NULL,
                     password varchar(70) NOT NULL,
                     refer varchar(70) DEFAULT 0,
                     videoState int(10) DEFAULT 1,
                     myRefer varchar(50),
                     coins int(100) DEFAULT 0,
                     profileImage varchar(700) DEFAULT 'none',
                     cap1LastPlay BIGINT(10) DEFAULT 0,
                     cap2LastPlay BIGINT(10) DEFAULT 0,
                     cap3LastPlay BIGINT(10) DEFAULT 0,
                     cap4LastPlay BIGINT(10) DEFAULT 0,
                     watchLastPlay BIGINT(10) DEFAULT 0,
                     versionNo varchar(10) DEFAULT '1.1.0',
                     CONSTRAINT UC_Users UNIQUE (email,phone,deviceId,myRefer)
                     )`;
    const CREATE_Earning_TABLE=`
                 CREATE TABLE if not exists Earnings(
                    id INT(110) PRIMARY KEY AUTO_INCREMENT,
                    earningText varchar(80),
                    userId varchar(80),
                    previousBalance int(80),
                    newBalance int(80),
                    time varchar(80)
                     )`;
    const CREATE_INSTANT_TABLE=`
                 CREATE TABLE if not exists InstantWithdraws(
                    id INT(110) PRIMARY KEY AUTO_INCREMENT,
                    userId varchar(80),
                    state varchar(80),
                    coins int(80),
                    time varchar(80),
                    payment varchar(80),
                    accountNo varchar(80)
                     )`;
    const CREATE_VERSION_TABLE=`
                 CREATE TABLE if not exists versions(
                    id INT(110) PRIMARY KEY AUTO_INCREMENT,
                    versionNo varchar(20) DEFAULT 1.0,
                    priority int(10)
                     )`;
    const CREATE_PAYMENT_TABLE=`
                 CREATE TABLE if not exists payments(
                    id INT(110) PRIMARY KEY AUTO_INCREMENT,
                    paypal int(20),
                    bkash int(20),
                    gcash int(20),
                    paytm int(20),
                    jazz int(20),
                    payoner int(20),
                    playstore int(20),
                    amazon int(20)
                     )`;
    const CREATE_WITHDRAW_TABLE=`
                 CREATE TABLE if not exists withdraw(
                    id INT(110) PRIMARY KEY AUTO_INCREMENT,
                    userId varchar(80),
                    state varchar(80),
                    coins int(80),
                    time varchar(80),
                    payment varchar(80),
                    accountNo varchar(80)
                     )`;
    const CREATE_SETTING_TABLE=`
                 CREATE TABLE if not exists settings(
                    id INT(110) PRIMARY KEY AUTO_INCREMENT,
                    coinValue int(10), 
                    regCoin int(10), 
                    bkash int(10), 
                    paytm int(10), 
                    refer int(10), 
                    cap1 int(10), 
                    minW int(10), 
                    cap2 int(10), 
                    cap3 int(10), 
                    cap4 int(10), 
                    offer int(10), 
                    showOffer varchar(20) DEFAULT 'not', 
                    firstCaptchaDelayTime BIGINT(10) DEFAULT 0, 
                    secondCaptchaDelayTime BIGINT(10) DEFAULT 0, 
                    thirdCaptchaDelayTime BIGINT(10) DEFAULT 0, 
                    fourthCaptchaDelayTime BIGINT(10) DEFAULT 0, 
                    watchDelayTime BIGINT(10) DEFAULT 0
                     )`;
    try{
        let userTable=await  connection.query(CREATE_USER_TABLE);
        let earningTable=await  connection.query(CREATE_Earning_TABLE);
        let paymentTable=await  connection.query(CREATE_PAYMENT_TABLE);
        let instantTable=await  connection.query(CREATE_INSTANT_TABLE);
        let versionTable=await  connection.query(CREATE_VERSION_TABLE);
        let withdrawTable=await  connection.query(CREATE_WITHDRAW_TABLE);
        let settingsTable=await  connection.query(CREATE_SETTING_TABLE);


     }catch(err){
        console.log("User Table Created Failed"+err)
   
    }

}

module.exports={
    createTables
}