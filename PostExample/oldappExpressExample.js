var express = require('express');
var app = express();
console.log("sarvani");

app.get("/" , function(req, resp){
   console.log("called /"); 
   resp.send("Hello..");
});

app.get("/speak/:animal" , function(req, resp){
    if(req.params.animal === "pig"){
        console.log("The " +req.params.animal +" says oink!");
        resp.send("The " +req.params.animal +" says oink!");
    }else if(req.params.animal === "cow"){
        console.log("The " +req.params.animal +" says Moooo!");
        resp.send("The " +req.params.animal +" says Moooo!");
    }if(req.params.animal === "dog"){
        console.log("The " +req.params.animal +" says Woof Woof!");
        resp.send("The " +req.params.animal +" says Woof Woof!");
    }
   console.log("called /"); 
   resp.send("Hello..");
});


app.get("/repeat/:word/:num" , function(req, resp){
    var respString = "";
    for(var i=0; i<req.params.num; i++){
        respString += req.params.word+ " ";
    }
    resp.send(respString);
    
});

app.get("*" , function(req, resp){
   console.log("called *"); 
   resp.send("You are a star");
});

app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Server listening on port ... ");
});