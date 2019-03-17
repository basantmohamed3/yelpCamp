const express =require("express"),
      router  = express.Router(),
      passport    = require("passport"),
      User        = require("../models/user"),
       Campground      = require("../models/campground"),
      Comment      = require("../models/comment");
      
      
router.get("/",(req, res)=>{
      res.render("landing");
})      

router.get("/register", (req,res)=>{
      res.render("register")
});

router.post("/register", (req,res)=>{
      var newUser =new User({ username: req.body.username, 
                                firstName:req.body.firstName, 
                                lastName:req.body.lastName,
                                avatar: req.body.avatar,
                                email: req.body.email
      }); // tool offerd by local mongoose    //when user register we redirect to authenticate and log in if not render register page
      
     User.register(newUser, req.body.password, (error, user)=>{ // we do not store the password in the object, insted we store the hash
           if(error){
                 console.log(error)
                 return res.render("register", {error:error.message});
           }else
                
                  passport.authenticate("local") (req,res, function(){
                      
          res.redirect("/campgrounds");
          
            
                
            
           })
           
          
     })  
})


//login route
router.get("/login", (req, res)=>{
      res.render("login", {message: req.flash("error you missed it up ")})
})
router.post('/login', passport.authenticate('local', { successRedirect: '/campgrounds',
                                                    failureRedirect: '/login' }));

//logout route
router.get('/logout', function(req, res){
  req.logout();
  req.flash("error", "logged you out!")
  res.redirect('/campgrounds');
});

// user profile route 

router.get("/users/:id", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      req.flash("error", "Something went wrong.");
      return res.redirect("/");
    }
    Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
      if(err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
      }
      res.render("users/show", {user: foundUser, campgrounds: campgrounds});
    })
  });
});

module.exports =router;
