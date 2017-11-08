var express = require("express");
var router  = express.Router();
var customerObj = require("../models/customerdetails");
var middlewareObj = require("../middleware/middleware");


// root route
router.get("/", function(req,res){
   
   res.redirect("/customerdetails");
    
});

// INDEX route
router.get("/customerdetails",middlewareObj.isLoggedIn,function(req,res){
    
    customerObj.find({},function(err,allCustomer){
       
       if(err){
           console.log("Error in retriving data from database");
           console.log(err);
       }else{
            res.render("index",{customerObj:allCustomer});        
       }
        
    });

   
    
});

// SHOW Route - will show the form
router.get("/customerdetails/add",middlewareObj.isLoggedIn,function(req, res) {

    
    res.render("submit");    
});

//Post route

router.post("/customerdetails",middlewareObj.isLoggedIn,function(req,res){
//   customerObj.push(
//       {
//           customerName:req.body.customer.name,
//           customerNumber:req.body.customer.phonenumber,
//           customerDetails:req.body.customer.details
           
//       });
   var customerName=req.body.customer.name;
   var customerEmail=req.body.customer.email
   var customerNumber=req.body.customer.phonenumber;
   var customerDetails=req.body.customer.details;
   var addedBy="Customer Details added by " +req.user.username.toUpperCase();
   var data={customerName:customerName,customerEmail:customerEmail,customerNumber:customerNumber,customerDetails:customerDetails,addedBy:addedBy};
    
    customerObj.create(data,function(err,newCustomer){
    if(err)
    {   
        req.flash("error","Error in Saving Customer")
        console.log("Error in saving data to database");
        res.redirect("/customerdetails");
        console.log(err);
    }
    else
    {
    
     req.flash("success","Saved Customer Data");        
     console.log("Customer data Saved Successfully");   
     res.redirect("/customerdetails");    
    }
});


   
});

//Mail route
router.get("/customerdetails/mail",middlewareObj.isLoggedIn,function(req,res){
   
   res.render("mail");
    
});

router.post("/customerdetails/mail",middlewareObj.isLoggedIn,function(req,res){
   
   customerObj.find({},function(err,foundCustomer){
       if(err){
           console.log(" error While getting data");
       } else{
            
            
            var email = req.body.email;
            middlewareObj.necessaryDetails(foundCustomer,email);
            req.flash("success","Mailed successfully");
            res.redirect("/customerdetails");
         }
    });
   
    
});


//EDIT route

router.get("/customerdetails/:id",middlewareObj.isLoggedIn,function(req,res){
   
   customerObj.findById(req.params.id,function(err,foundCustomer){
       if(err){
           console.log("Error retriving data in edit route");
           console.log(err);
       }else{
            res.render("edit",{customerObj:foundCustomer});         
       }
   });

  
    
});

//update route
router.put("/customerdetails/:id",middlewareObj.isLoggedIn ,function(req,res){
   
   var customerName = req.body.customer.customerName;
   var customerEmail=req.body.customer.customerEmail;
   var customerNumber=req.body.customer.customerNumber;
   var customerDetails=req.body.customer.customerDetails;
   var addedBy="Customer Details edited by " +req.user.username.toUpperCase();
   var data={customerName:customerName,customerEmail:customerEmail,customerNumber:customerNumber,customerDetails:customerDetails,addedBy:addedBy};
    
   
   customerObj.findByIdAndUpdate(req.params.id,data,function(err,updatedDetails){
      if(err){
          console.log("Error in Update route");
          req.flash("error","Error in retriving customer")
          console.log(err);
          res.redirect("/customerdetails");
      }else{
          console.log("Updated Customerdetail Successfully");
          req.flash("success","Updated Customer Details");
          res.redirect("/customerdetails");
      }
      
   });
   
   
  
});

router.delete("/customerdetails/:id",middlewareObj.isLoggedIn,function(req, res){
   
   customerObj.findByIdAndRemove(req.params.id,function(err){
      if(err){
          console.log("Error in deleting");
          req.flash("error","Error in deleting customer")
          res.redirect("/customerdetails");
      } else{
        console.log("Deleted Customerdetail"); 
        req.flash("success","Deleted Customer Details");
        res.redirect("/customerdetails"); 
      }
   });
   
});

module.exports = router;