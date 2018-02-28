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

Campground.create(
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
});


/*var campgroundsArr = [
        { name: "Sarvani1",
          image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"
        },
        { name: "Sarvani2",
          image: "https://unsplash.com/photos/tQeTKUnI4Ow"
        },
        { name: "Sarvani3",
          image: "https://unsplash.com/photos/3fJOXw1RbPo"
        },
        { name: "Sarvani4",
          image: "https://unsplash.com/photos/IejSZKGu1mY"
        },
        { name: "Sarvani5",
          image: "https://unsplash.com/photos/UhGZ-k6EB_g"
        }
    ];*/

var campgroundsArr = Campground.find({}, function(err,campgrounds){
                                                    if(err){
                                                        console.log("Error getting campGrounds");
                                                    } else{
                                                        console.log("Campgrounds:", campgrounds);
                                                    }
                    });
/*[
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
];*/

app.get("/", function(req, resp){
    resp.render("landingPage");
});


app.get("/campgrounds", function(req, resp){
    resp.render("campGrounds", {campgroundsArr : campgroundsArr});
});

app.get("/new", function(req, resp){
    resp.render("new");
});


app.post("/campgrounds", function(req, resp){
    console.log(req.body.campground);
    //campgroundsArr.push({name:req.body.campground, image:req.body.image});
    campgroundsArr.update({name:req.body.campground, image:req.body.image}, function(error, campgrd){
        if(error){
            console.log("Update failed");
        }
    });
    resp.render("campGrounds", {campgroundsArr : campgroundsArr});
});


app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Server is listening on : "+ process.env.PORT); 
});