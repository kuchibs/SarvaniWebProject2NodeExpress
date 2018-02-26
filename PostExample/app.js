var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extend:true}));
var friends = [];


app.get("/", function(req, resp){
    
   var request = require('request');
   var b;
   request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', 
   function (error, response, body) {
   if(!error && response.statusCode==200){
      b = JSON.parse(body);
      console.log('body:', b.query.results.channel.astronomy.sunset); 
      resp.render("hello", {b: b.query.results.channel.astronomy.sunset});
   }
  
});
    
    //resp.send("Working!");
    
});


app.get("/hello", function(req, resp){
    resp.render("hello");
});




//friends
app.get("/friends", function(req, resp){
    friends = ["sar0", "sar1", "sar2","sar3","sar4","sar5","sar6","sar7","sar8","sar9"];
    resp.render("friends", {friends: friends});
   
} );

//addFriend
app.post("/addFriend", function(req, resp){
    friends.push(req.body.newFriend);
    resp.render("friends", {friends: friends});
   
} );

app.listen( process.env.PORT, process.env.IP, function(){
    console.log("Server is listening!!");
    
} );