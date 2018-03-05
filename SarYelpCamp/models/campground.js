var mongoose = require("mongoose");
 
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Campground", campgroundSchema);

/*var mongoose = require("mongoose");

var CampSchema = new mongoose.Schema(
    {
     name: String,
     image: String,
     description: String,
     comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
     ]
    });

var Campground = mongoose.model("Campground", CampSchema);

module.exports = Campground;

*/