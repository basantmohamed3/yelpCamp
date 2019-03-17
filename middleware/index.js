var Campground =require ("../models/campground"),
 Comment=require ("../models/comment")
var middlewareObj ={}

middlewareObj.checkCampgeroundOwnership = function(req,res,next){
       if(req.isAuthenticated()){
                 var postId = req.params.id;
      Campground.findById(postId, (error,foundCampground)=>{
            if (error){
               res.redirect("back");   
            }else{    // if the user is the author of campgroun
            console.log("okay logged in")
                  if(foundCampground.author.id.equals(req.user._id)) {
                           next();
                           console.log("same user")
                  }else{
                      
                        console.log("not permitted")
                        res.redirect("back")
                  }
            }
       });
       
       }
   else {
         res.redirect("back");
         }

      
}

middlewareObj.checkCommentOwnership = function(req,res,next){
       if(req.isAuthenticated()){
                 var postId = req.params.comment_id;
      Comment.findById(postId, (error,foundComment)=>{
            if (error){
               res.redirect("back");   
            }else{    // if the user is the author of campgroun
            console.log("okay logged in")
                  if(foundComment.author.id.equals(req.user._id)) {
                           next();
                           console.log("same user")
                  }else{
                      
                        console.log("not permitted")
                        res.redirect("back")
                  }
            }
       });
       
       }
   else {
         res.redirect("back");
         }

      
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!")
    res.redirect("/login")
}     

module.exports =middlewareObj;