var express = require('express');
var router = express.Router();
var pool=require('./pool')

router.get('/displayallcategory',function(req, res, next) {
  pool.query('select * from admin',function(error,result){
 
    if(error)
    {0
      console.log(error)
      return res.status(500).json([])
  }
  else{ 
      return res.status(200).json(result)
  }
  })
});

var upload= require('./multer')

router.post('/checkadminlogin',function(req,res,next){
  console.log("hello");
  console.log(req.body);
  var userEmail =  req.body.userEmail;
  var UserPassword = req.body.UserPassword;
  
    pool.query('select * from userregister where userEmail=? and UserPassword=?',[userEmail,UserPassword],function(err,result){
     // pool.query('select * from userregister ',function(err,result){
      if(err){
        console.log(err);
      }

     else if(result.length>0)
      {
        console.log('sucessfull');
        console.log("next stage...............",result);
       // var result1 = res.status(200).json({RESULT:result});
        return res.status(200).json({RESULT:result})
         //console.log(result1.adminId);
            }
    else {    
      console.log('unsucessfull');
      return res.status(500).json({RESULT:false})
    }
    });
  });
  
router.post('/takedata',function(req,res,next){
  console.log("nikhil");
  console.log(req.body);
    pool.query('select * from userregister where userId=?',[req.body.userId],function(err,result){
      if(err){
        console.log(err);
        return res.status(500).json({RESULT:false})
      }
    else {    
      console.log('sucessfull');
      console.log(result);
      return res.status(200).json({RESULT:result})
    }
    });
  });

  router.post('/checksignup',function(req,res,next){
    console.log(req.body)
    //console.log(req.file)
    pool.query('insert into userregister(userName,userPhoneNo,userAge, userGender,userEmail,userAddress,UserPassword)values(?,?,?,?,?,?,?)',[req.body.userName,req.body.userPhoneNo,req.body.userAge,req.body.userGender,req.body.userEmail,req.body.userAddress,req.body.UserPassword],function(error,result){
      if(error)
      { console.log(error)
        return res.status(500).json({RESULT:false}) }
      else
      { return res.status(200).json({RESULT:result})
       console.log('successfully completed')
    }
    }) 
    });
    

  
router.post('/editData',function(req,res,next){
  
  console.log(req.body)

  pool.query('update userregister set userName=? , userPhoneNo=? , userAge=? , userGender=? , userEmail=? , userAddress=?  where userId=?',[req.body.userName,req.body.userPhoneNo,req.body.userAge,req.body.userGender,req.body.userEmail,req.body.userAddress,req.body.userId],function(error,result){
      if(error)
      {   console.log(error)
          return res.status(500).json({RESULT:false})
      }
      else{
    
          return res.status(200).json({RESULT:true})
      }
  })
});
module.exports = router;
  
/* if(result.length==0)
          {
            console.log('unsucessfull');

        return res.status(500).json({RESULT:false})
                }
        else {    
          console.log('sucessfull');
        return res.status(200).json({RESULT:result})
       



      if(row.length>0)
      {
        console.log('unsucessfull');

     res.json({'success':true , 'message':row[0].adminId});
            }
    else {    
      console.log('sucessfull');
      res.json({'success':false , 'message':'user not found,please try again'});
  }

  userPhoneNo =? userAge =? userGender =? userEmail=? userAddress=?
  req.body.userPhoneNo,req.body.userAge,req.body.userGender,req.body.userEmail,req.body.userAddress,
  */