const express =require("express"),
      router  = express.Router(),
      Campground      = require("../models/campground"),
      Comment      = require("../models/comment"),
      middleware =require("../middleware/index.js")
      
      
router.get("/campgrounds", (req,res)=>{
      console.log(req.user)
      Campground.find({}, (error, allCampgrounds)=>{
            if (error) {
                  console.log(error)
            }
            else  {
                  res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser:req.user})
                  
                  
            }
            
      })
      
     
}) 

router.get("/campgrounds/new",middleware. isLoggedIn,(req, res)=>{
      res.render("campgrounds/new")
      
})

router.post ("/campgrounds", middleware.isLoggedIn, (req, res)=>{
    
      var name = req.body.name;
         var price = req.body.price;
      var image =req.body.image;
      var description=  req.body.description; 
      var author  ={
            id: req.user._id,
            username: req.user.username
      }
      var newCampground = {name:name, price:price, image:image, description: description, author:author};
      Campground.create(newCampground, (error, data)=>{
            if (error){
                  console.log(error)
            }else 
            {  
                  res.redirect("/campgrounds")
            }
            
      } )
})

router.get("/campgrounds/:id",(req,res)=>{
      var postId = req.params.id;
      Campground.findById(postId).populate("comments").exec((error, foundCampground)=>{
            if (error){
                  console.log(error);
            }else { 
                  res.render("campgrounds/show", {campground: foundCampground})
            }
      })

      
})
      
      
 router.get ("/campgrounds/:id/edit",middleware.checkCampgeroundOwnership, (req,res)=>{
       //check if user logged in 
     
                 var postId = req.params.id;
      Campground.findById(postId, (error,foundCampground)=>{
        res.render("campgrounds/edit", {campground: foundCampground} )
              
   })
 })
      

router.put("/campgrounds/:id",middleware.checkCampgeroundOwnership, (req,res)=>{
           var postId = req.params.id;
           var updatedPost = req.body.campground;
           Campground.findOneAndUpdate({_id:postId}, updatedPost, (error, data)=>{
                 if(error){
                       console.log(error);
                 }else {
                       res.redirect("/campgrounds/" + postId)
                 }
           })
})

router.delete ("/campgrounds/:id",middleware.checkCampgeroundOwnership, (req, res)=>{
        var postId = req.params.id;
        Campground.findOneAndDelete({_id:postId}, (error)=>{
              if(error){
                    console.log(error);
              }else 
              res.redirect("/campgrounds")
              
        })
})

//middleware

//     function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login")
// } 

// function checkCampgeroundOwnership(req,res,next){
//       if(req.isAuthenticated()){
//                  var postId = req.params.id;
//       Campground.findById(postId, (error,foundCampground)=>{
//             if (error){
//               res.redirect("back");   
//             }else{    // if the user is the author of campgroun
//             console.log("okay logged in")
//                   if(foundCampground.author.id.equals(req.user._id)) {
//                           next();
//                           console.log("same user")
//                   }else{
                      
//                         console.log("not permitted")
//                         res.redirect("back")
//                   }
//             }
//       });
       
//       }
//   else {
//          res.redirect("back");
//          }

      
// }

module.exports =router;    
      