var express       = require("express");
var router        = express.Router();
var passport      = require("passport");
var User          = require("../models/user");
var middlewareObj = require("../middleware/middleware");



//Authentication routes.

//register
router.get("/register",function(req, res) {
   
   res.render("register"); 
});


// register post route
router.post("/register",function(req,res){
   
   var newUser;
   var password = req.body.admin_password;
   if(password==="12345"){
       var newUser = new User({username:req.body.username,isAdmin:true});
       
       User.register(newUser,req.body.password,function(err,user){
      
        if(err){
            console.log("There is an error in user registration");
            req.flash("error","Error in registering user");
            return res.render("register");
        }else{
        // passport.authenticate("local")(req,res,function(){
           
        //   res.redirect("/customerdetails");
            
        // });
            console.log(user);
            console.log("User account Created");
            req.flash("success","Successfully Registered User");
            res.redirect("/login");        }
   });
   }else{
       console.log("Enter the Super Admim Password to register");
       req.flash("error","Only Admin Can create User")
       res.redirect("/register");
   }
   
   
});

//Creating Duplicate route for User based Registration.


router.get("/login",function(req, res) {
   
   
   res.render("login"); 
});

//login post route 

router.post("/login",passport.authenticate("local",{
    
    
    successRedirect:"/customerdetails",
    failureRedirect:"/login",
    failureFlash: true,
    successFlash:"Welcome"
    
}),function(req, res) {
    
});

//log out route

router.get("/logout",middlewareObj.isLoggedIn,function(req, res) {
    req.logout();
    req.flash("success","Successfully Logged Out")
    res.redirect("/login");
});


module.exports = router;