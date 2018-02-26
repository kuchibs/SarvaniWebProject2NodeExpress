var app = require('express')();
var request = require('request');
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extend:true}));

/*
General search: http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb 

Search with Movie ID: http://www.omdbapi.com/?i=tt3896198&apikey=thewdb*/

var movieListAPIStr = "http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb";
var movieList = [];
request(movieListAPIStr, function(error, response, body){
    var jsonBody = JSON.parse(body);
    var searchArr = jsonBody.Search;
    
    searchArr.forEach(function(movie){
        movieList.push(movie.Title);
    });
    
});

app.get("/", function(req, resp){
    resp.render("movieHome", {movies: movieList});    
});
//addMovie
app.post("/addMovie", function(req, resp){
    var movie = req.body.movie;
    movieList.push(movie);
    resp.redirect("movieHome", {movies: movieList});    
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!!!");
});

