'use strict';

const Datastore = require('nedb');
const db = new Datastore({ filename: 'db.json' });

db.loadDatabase(function (err) { // Callback is optional
    if(!err) {
        console.log("DB Connected");
    }
});

/**
 * Store new document in collection
 * @param collectionName
 * @param doc
 */
db.insertData = function (collectionName, doc, callback) {
    if(collectionName != '' && doc) {
        var collection = {
            collection_name: collectionName,
            data: doc
        }
        db.insert(collection, function (err, newDoc) {
            console.log("insert");
            callback(newDoc)
        });
    }

}

db.createIndexing = function (collectionName, indexingDoc) {
    if(collectionName != '' && indexingDoc) {
        var indexingColl = {
            collection_name: collectionName,
            indexingData: indexingDoc
        }
        db.insert(indexingColl, function (err, newIndexDoc) {
            console.log("insert indexing document");
            
        });
    }
}

db.findData = function (collectionName, search, callback) {
    var results = [];
    var k = 0;
    if(search.method == "all") {
        var pos=0;
        db.find({collection_name: collectionName, indexingData: {$elemMatch: {text: new RegExp(search.searchText, 'g')}}}).exec(function (err, docs) {
            docs.forEach(function (doc, index) {
                doc.indexingData.forEach(function (field, index) {
                    if(field.fieldName == 'customer_name')
                        results.push(field);
                })
            })
            callback(results);
        })
    } else if(search.method == "field") {
        k = 0;
        db.find({collection_name: collectionName}).exec(function (err, docs) {
            for(var i = 0; i < docs.length; i ++) {
                for(var j = 0; j < docs[i].indexingData.length; j ++) {
                    if(search.searchText) {
                        if (docs[i].indexingData[j].fieldName == search.fieldName && docs[i].indexingData[j].fieldValue == search.searchText) {
                            results[k] = docs[i].indexingData[j]
                            k++;
                        }
                    } else {
                        if (docs[i].indexingData[j].fieldName == search.fieldName) {
                            results[k] = docs[i].indexingData[j]
                            k++;
                        }
                    }
                }
            }
            callback(results)
        })
    }
}

module.exports = db;