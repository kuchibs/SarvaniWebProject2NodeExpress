var app        = require("express")();
var bodyParser = require("body-parser");
var ejs        = require("ejs");
var request    = require("request");

app.set("view engine", "ejs");


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

var campgroundsArr = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
];

app.get("/", function(req, resp){
    resp.render("landingPage");
});


app.get("/campgrounds", function(req, resp){
    resp.render("campGrounds", {campgroundsArr : campgroundsArr});
});


app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Server is listening on : "+ process.env.PORT); 
});