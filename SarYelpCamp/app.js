var app    = require("express")(),
bodyParser = require("body-parser"),
ejs        = require("ejs"),
request    = require("request"),
mongoose   = require("mongoose"),
Campground = require("./models/campground.js"),
seedDB     =  require("./seeds");;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extend:true}));
mongoose.connect("mongodb://localhost:/camp-db");

seedDB();

app.get("/", function(req, resp){
    resp.render("landingPage");
});


app.get("/campgrounds", function(req, resp){
    
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err)
       } else {
          resp.render("index",{campgrounds : campgrounds});
       } 
    });
     
});

app.get("/new", function(req, resp){
    resp.render("new");
});


app.post("/campgrounds", function(req, resp){
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
            ///resp.redirect("/campgrounds");
            resp.redirect("/index");
        }
    });
    /*console.log(req.body.campground);
    //campgroundsArr.push({name:req.body.campground, image:req.body.image});
    campgroundsArr.update({name:req.body.campground, image:req.body.image}, function(error, campgrd){
        if(error){
            console.log("Update failed");
        }
    });
    resp.render("campGrounds", {campgroundsArr : campgroundsArr});*/
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})


app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Server is listening on : "+ process.env.PORT); 
});