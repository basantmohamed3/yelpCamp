const express =require("express"),
      router  = express.Router({mergeParams:true}),
      Campground      = require("../models/campground"),
      Comment      = require("../models/comment"),
            middleware =require("../middleware/index.js")
      
 
 router.get("/new",isLoggedIn, (req, res)=>{

        Campground.findById(req.params.id, (error, data)=>{
            if (error) {
                  console.log(error)
            }
            else  {
                 res.render("comments/new", {campground:data})
                  
                  
            }
       
 })
  });
 
      
  router.post("/", (req,res)=>{
    
         
        Campground.findById(req.params.id, (error, campground)=>{
              if (error){
                    console.log(error)
                    res.redirect("/campgrounds")
              }else {
                   
                    Comment.create(req.body.comment, (error, comment)=>{
                          if(error) {
                                console.log(error)
                          
                          }else{
                              comment.author.id =req.user._id;
                              comment.author.username =req.user.username;
                              comment.save();
                                campground.comments.push(comment);
                                campground.save();
                                console.log(req.params.id)
                                res.redirect("/campgrounds/"+campground._id)
                          }
                          
                    })
              }
        })
  } )      // lookup campground by ID
                                                 // create new comment
                                                 // connect new comment to campground
                                                 // redirect to campground show page
                                                 
                                                 
    // edit comments

router.get("/:comment_id/edit",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findById(req.params.comment_id, (error, foundComment)=>{
  
        if(error){
            console.log(error)
            res.redirect("back")
        }
        else {
            res.render("comments/edit", {campground_id: req.params.id, comment:foundComment})
        }
    })
    
    
})
router.put("/:comment_id", (req,res)=>{
    console.log(req.params.comment_id)
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (error, updatedComment)=>{

        if(error){
            console.log(error)
            res.redirect("back")
        }else {
            res.redirect("/campgrounds/"+ req.params.id)
        }
        
    })
})

router.delete ("/:comment_id",middleware.checkCommentOwnership, (req,res)=>{
    console.log(req)
    Comment.findByIdAndRemove(  req.params.comment_id, (error)=>{
        if(error){
            console.log(error)
            res.redirect("back")
        }else { 
            res.redirect("/campgrounds/"+ req.params.id)
        }
    })
})


    function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}                                                 
      
module.exports =router;          