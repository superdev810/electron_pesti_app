'use strict';
const db        = require("../models/nedb")
var formidable  = require('formidable'),
    http        = require('http'),
    upload      = require('jquery-file-upload-middleware');


exports.index = function(req, res, next){
    if(req.query.id){
        db.find({collection_name: "customers", _id: req.query.id}).exec(function (err, docs) {
            if(err)
                return res.status(400).send({message: 'Query Failed'});
            return res.render('customer/index', {search: true, result: docs, hostname: req.headers.host});
        })
    }else {
        res.render("customer/index", {search: false, result: {}, hostname:{}});
    }
}

exports.get_customerinfo = function (req, res, next) {
    if(req.query.id) {
        db.find({collection_name: "customers", _id: req.query.id}).exec(function (err, docs) {
            res.json(docs)
        })
    }else{
        return res.status(400).send({msg: 'Id is empty'});
    }
}
exports.save_newcustomer = function (req, res, next) {
    console.log('---Insert Data Controller---');
    db.insertData("customers", req.body, function (newDoc) {
        //console.log(newDoc)
        var indexing_collection = [{
                text: newDoc.data.customer_name,
                id: newDoc._id,
                fieldName: 'customer_name'
            }, {
                text: newDoc.data.pronounce,
                id: newDoc._id,
                fieldName: 'pronounce'
            }
        ]
        var k = 0;
        if(newDoc.data.postit) {
            for (var i = 0; i < newDoc.data.postit.length; i++) {
                if(newDoc.data.postit[i].fields) {
                    for(var j = 0; j < newDoc.data.postit[i].fields.length; j ++) {
                        indexing_collection[i +  k + 2] = {
                            text: newDoc.data.postit[i].fields[j].fieldValue,
                            id: newDoc._id,
                            fieldName: newDoc.data.postit[i].fields[j].fieldName
                        }
                        k ++;
                    }
                }

            }
        }
        db.createIndexing('customers_indexing', indexing_collection)
    });
    res.send({message: "success"})
}

exports.get_customerlist = function (req, res, next) {
    var search = {
        method: 'all',
        searchText: req.query.keyword
    }
    db.findData("customers_indexing", search, function (results) {
        res.send(results)
    })
};

exports.get_reservation_date = function (req, res, next) {
    var search = {
        method: 'field',
        fieldName: '予約日'
    }
    db.findData("customers_indexing", search, function (results) {
        res.send(results)
    })
};

exports.file_upload = function (req, res, next) {
    var uploadParams = {
        uploadDir: 'public/upload',
        uploadUrl: '/upload',
        maxPostSize: 11000000, // 11 MB
        maxFileSize: 10000000, // 10 MB
        acceptFileTypes: /.+/i
    };
    upload.fileHandler(uploadParams)(req, res, next);
}
