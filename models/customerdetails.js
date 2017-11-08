var mongoose = require("mongoose");



//setting up our data schema
var customerObjSchema = new mongoose.Schema({

    customerName:String,
    customerEmail:String,
    customerNumber:Number,
    customerDetails:String,
    addedBy:String
    
});

//setting up mongoose model methods with customerObjSchema.
var customerObj = mongoose.model("Customerdetail",customerObjSchema);

module.exports = customerObj;