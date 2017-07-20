'use strict';
const db = require("../models/nedb")
var os = require('os');
exports.index = function(req, res) {
    res.render("expand/index");
}
exports.get_expandsetting = function (req, res) {
    db.find({lan_access: { $exists: true } }, function (err, docs) {
        db.find({collection_name: "expansion"}).exec(function (err, docs) {
            var interfaces = os.networkInterfaces();
            var addresses = [];
            for (var k in interfaces) {
                for (var k2 in interfaces[k]) {
                    var address = interfaces[k][k2];
                    if (address.family === 'IPv4' && !address.internal) {
                        var lanAccess = req.headers.referer.split('//')[0] + '//' + address.address + ':' + req.headers.host.split(':')[1];
                        addresses.push(lanAccess);
                    }
                }
            }
            res.send({message: "success", result: docs[0], hostname: addresses})
        });
    });
}
exports.set_expandsetting = function (req, res) {
    if(req.query.HotelNumChecked) {
        db.update({collection_name: "expansion"}, {$set: {hotel_number: req.query.HotelNumChecked}}, {upsert: false}, function (err, numReplaced, upsert) {
            res.send({message: "success"})
        })
    }
    if (req.query.LanChecked) {
        db.update({collection_name: "expansion"}, {$set: {lan_access: req.query.LanChecked}}, {upsert: false}, function (err, numReplaced, upsert) {
            var interfaces = os.networkInterfaces();
            var addresses = [];
            for (var k in interfaces) {
                for (var k2 in interfaces[k]) {
                    var address = interfaces[k][k2];
                    if (address.family === 'IPv4' && !address.internal) {
                        var lanAccess = req.headers.referer.split('//')[0] + '//' + address.address + ':' + req.headers.host.split(':')[1];
                        addresses.push(lanAccess);
                    }
                }
            }
            
            res.send({message: "success", data: addresses, checked: req.query.LanChecked});
        })
    }
    if (req.query.CalendarChecked) {
        db.update({collection_name: "expansion"}, {$set: {calendar_search: req.query.CalendarChecked}}, {upsert: false}, function (err, numReplaced, upsert) {
            res.send({message: "success"})
        })
    }

}
