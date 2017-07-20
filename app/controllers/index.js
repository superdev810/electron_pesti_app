'use strict';
const db = require("../models/nedb")

exports.index = function(req, res, next) {
        
    db.find({collection_name: "expansion"}).exec(function (err, docs) {
        if(docs.length == 0) {
            db.insert({collection_name: "expansion", lan_access: "false", hotel_number: "false", calendar_search: "true"}, function (err,newDoc) {
            });
            if(req.headers.host == 'localhost:3000')
                res.render("index")
            else
                res.send("You can only access to server with localhost:3000")
        } else {
            if(docs[0].lan_access == "true") {
                res.render("index")
            } else {
                if(req.headers.host == 'localhost:3000')
                    res.render("index")
                else
                    res.send("You can only access to server with localhost:3000")
            }
        }

     });

}
exports.left_menu = function(req, res, next){
    if(req.query.ids) {
        var ids = req.query.ids.split(" ")
        db.find({_id: { $in: ids } }, function (err, docs) {
            res.render("templates/left-menu", {calendar:true, search_result: docs});
        });

    } else {
        res.render("templates/left-menu",{calendar:false, search_result:{}});
    }

}
exports.home = function(req, res, next){
    res.render("templates/home-page");
}