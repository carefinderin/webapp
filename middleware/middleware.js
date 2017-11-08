var elasticemail = require("elasticemail");
var customerObj  = require("../models/customerdetails.js");



var middlewareObj={}

//custom middleware
middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        
        return next();
    }
    res.redirect("/login");

}

middlewareObj.sendMail = function (text,email){
  

 var client = elasticemail.createClient({
  username: 'Care finder',
  apiKey: process.env.api
  
});
 
var msg = {
  from: 'carefinderin@gmail.com',
  from_name: 'Carefinder',
  to: email,
  subject: 'Customer Details',
  body_text: text
};
 
client.mailer.send(msg, function(err, result) {
  if (err) {
    console.log(err);
    console.log("Mail Error");
  }
 
    console.log("Mail Sent");
  console.log(result);
});
    
};

middlewareObj.necessaryDetails = function (customerObj,email){
  
  var textDetails="";
  
  customerObj.forEach(function(data){
   
   console.log(data);
   
  var customerName ="Name -" +data.customerName;
  var customerEmail  ="Email -" +data.customerEmail;
  var customerNumber ="Number -" +data.customerNumber;
  var customerDetails ="Details -" +data.customerDetails;
   
      textDetails += customerName + '\n' + customerEmail + '\n' + customerNumber + '\n' + customerDetails + '\n\n';
});
    
    this.sendMail(textDetails,email);
    
};


module.exports = middlewareObj;