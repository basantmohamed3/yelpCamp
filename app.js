const express    = require("express"), 
      app     = express(),
      ejs        = require ("ejs"),
      bodyParser = require("body-parser"),
      mongoose   = require ("mongoose"),
      moment   = require("moment"),
      flash      = require("connect-flash"),
      methodOverride    = require("method-override"),
      passport    = require("passport"),
 LocalStrategy = require('passport-local').Strategy,
      User        = require("./models/user");
      
      
const commentRoute      = require("./routes/comments"),
      campgroundRoute      = require("./routes/campgrounds"),
      indexRoute      = require("./routes/index");

mongoose.connect("mongodb+srv://basant:engineer@cluster0-hr45z.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }); 
app.use (bodyParser.urlencoded({"extended":true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ '/public'));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again",
    resave: false,
    saveUninitialized: false

}));
app.locals.moment = require('moment');
app.use (passport.initialize());
app.use(passport.session());
passport.use(new  LocalStrategy(User.authenticate())); // is a too come from passport local mongoose if we did not import it we will write it from scratch
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser =req.user;
    res.locals.error =req.flash("error");
      res.locals.success =req.flash("success");
       res.locals.noMatch =req.flash("error")

    next();
})

app.use(indexRoute);
app.use("/campgrounds/:id/comments", commentRoute);
app.use( campgroundRoute);



app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log("Server is working!!!!!!!");
})