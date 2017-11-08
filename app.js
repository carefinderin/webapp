var express        = require("express"),
    bodyparser     = require("body-parser"),
    path           = require("path"),
    methodOverride = require("method-override"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    localStratergy = require("passport-local"),
    elasticemail   = require('elasticemail'),
    customerObj    = require("./models/customerdetails"),
    User           = require("./models/user"),
    flash          = require("connect-flash"),
    app            = express(),
    
//routes    
    customerDetailsRoute  = require("./routes/customerdetails"),
    authRoute             = require("./routes/auth");    
    

//type of view
app.set("view engine","ejs");

//send static files to the server
app.use(express.static(path.join(__dirname, 'public')));

//setting up the db
mongoose.connect("mongodb://localhost/customerApp_V5",{ useMongoClient:true });

//to use bodyparser
app.use(bodyparser.urlencoded({extended:true}));

//telling our app to use method-override
app.use(methodOverride("_method"));

// configuring passport.js
app.use(require("express-session")({
    secret:"Carefinder is a company for all elderly needs",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//making sure app uses connect-flash
//it helps us in displaying flash messages easier.
app.use(flash());


//our own app middleware
app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error      = req.flash("error");
   res.locals.success    = req.flash("success");
   next();
});



app.use(authRoute);
app.use(customerDetailsRoute);




// app running in port codes
app.listen(process.env.PORT,process.env.IP, function(){
   
   console.log("Server has started....");
    
});