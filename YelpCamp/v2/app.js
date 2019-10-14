var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelpcamp", {useNewUrlParser: true, useUnifiedTopology: true});

var CampgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", CampgroundSchema);

//Campground.create(
//    {
//        name: "Lakeside Dreams", 
//        image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//        description: "Beautiful place by the lake with mountains at a altitude of 9000ft"
//    },function(err, campground){
//        if(err){
//            console.log("Something Went Wrong!!!");
//        } else {
//            console.log("Added New Campground");
//            console.log(campground)
//        }
//    }
//);

//var campGrounds = [
//    {name: "Lakeside Dreams", image:
//        "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
//    {name: "Granite hill", image:
//        "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1006&q=80"},
//    {name: "Salmon Creek", image:
//        "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
//    {name: "Lakeside Dreams", image:
//        "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
//    {name: "Granite hill", image:
//        "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1006&q=80"}
//];


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampGrounds){
        if(err){
            console.log("Something Went wrong");
        } else{
            res.render("index", {campGrounds: allCampGrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampGround = {name: name, image: image, description: description};
    Campground.create(newCampGround, function(err, newCampGround){
        if(err){
            console.log("Something Went Wrong");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("Something went wrong in getting the info");
        } else{
            res.render("show", {campground: campground});
        }
    });
});


app.listen(3000, function(){
    console.log("Serving YelpCamp at PORT 3000");
});
