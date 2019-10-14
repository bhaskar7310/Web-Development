var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Elit possimus esse inventore sunt aperiam officiis debitis Quasi quod nisi veniam inventore iusto? Nemo facere excepturi provident iusto corrupti. Ullam mollitia nostrum voluptatibus distinctio sed Dignissimos illo quia illo. Ipsum similique odit consequatur adipisci error quas Velit odio repellendus cum quos ipsa! Impedit laborum quod illum perspiciatis harum? Cumque amet consequatur voluptates sunt velit Ullam at expedita earum incidunt!"
    },
    {
        name: "Desert Mesa", 
        image: "https://images.unsplash.com/photo-1502218808493-e5fd26249efc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Ipsum similique odit consequatur adipisci error quas Velit odio repellendus cum quos ipsa! Impedit laborum quod illum perspiciatis harum? Cumque amet consequatur voluptates sunt velit Ullam at expedita earum incidunt! Ipsum similique odit consequatur adipisci error quas Velit odio repellendus cum quos ipsa! Impedit laborum quod illum perspiciatis harum? Cumque amet consequatur voluptates sunt velit Ullam at expedita earum incidunt!"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Ipsum recusandae aliquam dolores fuga eaque. Harum aliquid possimus cum quaerat error! Numquam nisi possimus necessitatibus consequuntur harum tempore consequuntur Unde doloribus modi mollitia sequi ipsa Provident numquam asperiores accusamus saepe quasi. Officia consequuntur eos! Adipisicing natus cupiditate eveniet voluptatem consectetur, numquam Mollitia incidunt optio architecto qui possimus. Culpa iste sapiente delectus laudantium quia. Eos"  
     }
]

function seedDB(){
   //Remove all campgrounds
   Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.deleteMany({}, function(err){
            if(err){
                console.log(err);
            } else {
                 //add a few campgrounds
                 data.forEach(function(seed){
                     Campground.create(seed, function(err, campground){
                         if(err){
                             console.log(err)
                         } else {
                             console.log("added a campground");
                             //create a comment
                             Comment.create(
                                 {
                                     text: "This place is great, but I wish there was internet",
                                     author: "Homer"
                                 }, function(err, comment){
                                     if(err){
                                         console.log(err);
                                     } else {
                                         campground.comments.push(comment);
                                         campground.save();
                                         console.log("Created new comment");
                                     }
                                 });
                         }
                     });
                 });
            
            }
        })
    }); 
}

module.exports = seedDB;

