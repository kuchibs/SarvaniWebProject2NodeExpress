var app    = require("express")(),
bodyParser = require("body-parser"),
ejs        = require("ejs"),
request    = require("request"),
mongoose   = require("mongoose"),
Campground = require("./models/campground.js"),
Comment    = require("./models/comment.js"),
seedDB     =  require("./seeds");;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extend:true}));
mongoose.connect("mongodb://localhost:/camp-db");

seedDB();

app.get("/", function(req, resp){
    resp.render("landingPage");
});


app.get("/campground/index", function(req, resp){
    
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err)
       } else {
          resp.render("campground/index",{campgrounds : campgrounds});
       } 
    });
     
});

app.get("/campground/campground/new", function(req, resp){
    resp.render("campground/new");
});


app.post("/campground/index", function(req, resp){
     // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            resp.redirect("/campground/index");
        }
    });
 });

// SHOW - shows more info about one campground
app.get("/campground/index/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campground/show", {campground: foundCampground});
        }
    });
});

// *********************************
//  COMMENT ROUTES - nested routes
// *********************************
app.get("/campground/:id/comment/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

app.get("/campground/:id/comments", function(req, res){
   //lookup campground using ID
   //create new comment
   //connect new comment to campground
   //redirect campground show page
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });

});



app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Server is listening on : "+ process.env.PORT); 
});