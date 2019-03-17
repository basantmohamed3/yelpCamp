var mongoose = require ("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");   //plugin  add tools to the user model


var UserSchema = new mongoose.Schema ({
    username:String,
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email:String
});

UserSchema.plugin(passportLocalMongoose);
module.exports =mongoose.model("User", UserSchema);