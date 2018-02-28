const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

/*const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
*/



var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//add new cat to db
/*
var akshu = new Cat({
     name: "Bhavani",
   age: 6,
   temperament: "awesome"
    
});

//Mongo operation is async and hence we add a callback

akshu.save(function(err, cat){
    if(err){
        console.log("There was an error - could not add "+cat +" to db");        
    }else{
        console.log("Cat added  to db"+cat);        
    }
    
});*/

Cat.create({
    name:"Sarvani", 
    age:30
}, function(err, cat){
    
});

Cat.find({}, function(err,cats){
    if(err){
        console.log("Error");
    }else {
        console.log("Cats:");
        console.log(cats);
    }
});
