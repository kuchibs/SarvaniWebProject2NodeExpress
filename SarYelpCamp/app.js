var app        = require("express")();
var bodyParser = require("body-parser");
var ejs        = require("ejs");
var request    = require("request");
var mongoose   = require("mongoose");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extend:true}));
mongoose.connect("mongodb://localhost:/camp-db");

var CampSchema = new mongoose.Schema(
    {
     name: String,
     image: String
    });

var Campground = mongoose.model("Campground", CampSchema);

/*Campground.create(
            { name: "Sarvani1",
              image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"
            }, function(error, campground){
                if(error){
                    console.log("Error adding campground:"  + error);
                }
});


Campground.create(
            {name: "Granite Hill", 
            image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"}, function(error, campground){
                if(error){
                    console.log("Error adding campground:"  + error);
                }
});*/


/*
var campgroundsArr = Campground.find({}, function(err,allCampgrounds){
                                                    if(err){
                                                        console.log("Error getting campGrounds");
                                                    } else{
                                                        console.log("Campgrounds:", allCampgrounds);
                                                    }
                    });*/


app.get("/", function(req, resp){
    resp.render("landingPage");
});


app.get("/campgrounds", function(req, resp){
    
    Campground.find({}, function(err, campgroundsArr){
       if(err){
           console.log(err);
       } else {
          resp.render("campGrounds",{campgroundsArr : campgroundsArr});
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
            resp.redirect("/campgrounds");
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


app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Server is listening on : "+ process.env.PORT); 
});