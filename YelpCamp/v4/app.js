var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    seedDB        = require("./seeds");

//App settings
mongoose.connect("mongodb://localhost/yelpcamp2", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


//Landing Page
app.get("/", function(req, res){
    res.render("landing");
});

//Campground Routes
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampGrounds){
        if(err){
            console.log("Something Went wrong");
        } else{
            res.render("campground/index", {campGrounds: allCampGrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("campground/new");
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
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log("Something went wrong in getting the info");
        } else{
            res.render("campground/show", {campground: campground});
        }
    });
});


//Comments Routes
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});
        }
    });
});


app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrouds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    res.redirect("/campgrounds/" + campground._id);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});


app.listen(3100, function(){
    console.log("Serving YelpCamp at PORT 3100");
});
