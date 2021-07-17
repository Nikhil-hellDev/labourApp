var express=require('express')
var router=express.Router();
var pool=require('./pool')
var upload=require('./multer')

var express=require('express')
var router=express.Router();
var pool=require('./pool')
var upload=require('./multer')


router.post('/checklabourlogin',function(req,res,next){
    console.log("hello");
    console.log(req.body);
    var labourPhoneNo =  req.body.labourPhoneNo;
    var labourPassword = req.body.labourPassword;
    
      pool.query('select * from labourregister where labourPhoneNo=1234 and labourPassword=12345',[labourPhoneNo,labourPassword],function(err,result){
       // pool.query('select * from labourregister ',function(err,result){
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

    
router.post('/deleteRecord',function(req, res, next) {
    console.log(req.body);
    pool.query('delete from running where labourId=3',[req.body.labourId],function(error,result){
       
      if(error)
     {
        return res.status(500).json({RESULT:false})}
  
     else
     {
      return res.status(200).json({RESULT:true})
     }
  
    })  
    }); 
    router.post('/addnewrecord',function(req, res, next) {
        console.log(req.body)
        pool.query('insert into confirm_labour(labourId,labourName,labourPhoneNo,labourAddress,userName) values(?,?,?,?,?)',[req.body.labourId,req.body.labourName,req.body.labourPhoneNo,req.body.labourAddress,req.body.userName],function(error,result){
        
            if(error){
                console.log(error)
                return res.status(500).json({RESULT:false})
            }
            else{ 
                return res.status(200).json({RESULT:true})
            }
            })
     });
     

    router.post('/fetchorderdata',function(req,res,next){
        console.log('hi');
        console.log(req.body);
          pool.query('select * from running where labourId=?',[req.body.labourId],function(err,result){
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




router.get('/displayallsubcategory',function(req, res, next) {
    pool.query('select * from addsubcategory',function(error,result){
   
    if(error){console.log(error)
        return res.status(500).json([])
    }
    else{ 
        return res.status(200).json(result)
    }
    })
});


router.post('/addnewlabour',upload.single('labourPhoto'),function(req, res, next) {
    console.log(req.body)
    pool.query('insert into labourregister(labourName,labourdob,labourAge,labourGender,labourPhoneNo,labourAnotherPhone,labourAdhar,labourAddress,labourCity,labourCountry,labourPincode,labourPhoto,labourWorkExperience) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.labourName,req.body.labourdob,req.body.labourAge,req.body.labourGender,req.body.labourPhoneNo,req.body.labourAnotherPhone,req.body.labourAdhar,req.body.labourAddress,req.body.labourCity,req.body.labourCountry,req.body.labourPincode,req.file.filename,req.body.labourWorkExperience],function(error,result){
    
        if(error){
            console.log(error)
            return res.status(500).json({RESULT:false})
        }
        else{ 
            return res.status(200).json({RESULT:true})
        }
        })
 });


 router.post('/addproffesion',upload.single('labourPhoto'),function(req, res, next) {
    console.log(req.body)
    pool.query('insert into labour_subcategory(categoryId,subcategoryId,labourId) values(?,?,?)',[req.body.categoryId,req.body.subcategoryId,req.body.labourId],function(error,result){
    
        if(error){
            console.log(error)
            return res.status(500).json({RESULT:false})
        }
        else{ 
            return res.status(200).json({RESULT:true})
        }
        })
 });



 router.post('/displaylabour',function(req, res, next) {
    pool.query('select * from  labourregister where labourId = ?',[req.body.categoryId],function(error,result){
   
    if(error){console.log(error)
        return res.status(500).json([])
    }
    else{ 
        return res.status(200).json(result)
    }
    })
});

router.get('/displaylaboursub',function(req, res, next) {
    pool.query('select * from  labour_subcategory',function(error,result){
   
    if(error){console.log(error)
        return res.status(500).json([])
    }
    else{ 
        return res.status(200).json(result)
    }
    })
});


    
router.post('/deleteRecordsub',function(req, res, next) {
    pool.query('delete from labour_subcategory where labourId=?',[req.body.labourId],function(error,result){
       
      if(error)
     {
        return res.status(500).json({RESULT:false})}
  
     else
     {
      return res.status(200).json({RESULT:true})
     }
  
    })  
    }); 



    router.post('/editData',function(req,res,next){
        console.log(req.body)
        console.log(req.file)
        pool.query('update labourregister set labourName=?,labourdob=?,labourAge=?,labourGender=?,labourPhoneNo=?,labourAnotherPhone=?,labourAdhar=?,labourAddress=?,labourCity=?,labourCountry=?,labourPincode=?,labourWorkExperience=? where labourId=?',[req.body.labourName,req.body.labourdob,req.body.labourAge,req.body.labourGender,req.body.labourPhoneNo,req.body.labourAnotherPhone,req.body.labourAdhar,req.body.labourAddress,req.body.labourCity,req.body.labourCountry,req.body.labourPincode,req.body.labourWorkExperience,req.body.labourId],function(error,result){
            if(error)
            {   console.log(error)
                return res.status(500).json({RESULT:false})
            }
            else{
                console.log(result)
                return res.status(200).json({RESULT:true})
            }
        })
    });


    router.post('/editDatapswd',function(req,res,next){
        console.log(req.body)
        console.log(req.file)
        pool.query('update labourregister set labourPassword=? where labourId=?',[req.body.labourPassword,req.body.labourId],function(error,result){
            if(error)
            {   console.log(error)
                return res.status(500).json({RESULT:false})
            }
            else{
                console.log(result)
                return res.status(200).json({RESULT:true})
            }
        })
    });

    router.get('/displaylabourfeedback',function(req, res, next) {
        pool.query('select * from  labourfeedback',function(error,result){
       
        if(error){console.log(error)
            return res.status(500).json([])
        }
        else{ 
            return res.status(200).json(result)
        }
        })
    });
    
module.exports = router;