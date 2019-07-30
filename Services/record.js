let async = require('async'),
    parseString = require('xml2js').parseString;

let util = require('../Utilities/util'),
    recordDAO = require('../DAO/recordDAO');
    //config = require("../Utilities/config").config;


    /**API to create the atricle */
    let createRecord = (data, callback) => {
       async.auto({
            record: (cb) => {
               var dataToSet = {
                   "rating":data.rating?data.rating:'',
                   "period":data.period,
               }
               console.log(dataToSet);
               recordDAO.createRecord(dataToSet, (err, dbData) => {
                   if (err) {
                       cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                       return;
                   }

                   cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED,"result":dataToSet });
               });
           }
        //]
       }, (err, response) => {
           callback(response.record);
       });
    }

    /**API to update the record */
    let updateRecord = (data,callback) => {
        async.auto({
            recordUpdate :(cb) =>{
                    if (!data.id) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                        return;
                    }
                    console.log('phase 1');
                    var criteria = {
                        id : data.id,
                    }
                    var dataToSet={
                        "rating": data.rating,
                        "period":data.period,
                    }
                    console.log(criteria,'test',dataToSet);
					recordDAO.updateRecord(criteria, dataToSet, (err, dbData)=>{
						if(err){
                            cb(null,{"statusCode":util.statusCode.FOUR_ZERO_ONE,"statusMessage":util.statusMessage.SERVER_BUSY});
						return;
						}
						else{
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED,"result":dataToSet  });
						}
					});
            }
        }, (err,response) => {
            callback(response.recordUpdate);
        });
    }

    /**API to delete the subject */
    let deleteRecord = (data,callback) => {
        console.log(data,'data to set')
        async.auto({
            removeRecord :(cb) =>{
                    if (!data.id) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                        return;
                    }
                    var criteria = {
                        id : data.id,
                    }
                    recordDAO.deleteRecord(criteria,(err,dbData) => {
                        if (err) {
                            console.log(err);
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                            return;
                        }
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DELETE_DATA });
                    });
            }
        }, (err,response) => {
            callback(response.removeRecord);
        });
    }

    /***API to get the record list */
    let getRecord = (data, callback) => {
        async.auto({
            record: (cb) => {
                recordDAO.getRecord({},(err, data) => {
                    if (err) {
                        console.log(data,'data testing----');
                        cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
                        return;
                    }
                    cb(null, data);
                    return;
                });
            }
        }, (err, response) => {
            callback(response.record);
        })
    }

    /***CNN API to get the record list by period */
    let getRecordByPeriod = (data, callback) => {
        async.auto({
            record: (cb) => {
                let criteria = {
                  "id":'123',
                  "period":data.period,
                }
                console.log(criteria);
                recordDAO.getRecordDetailByPeriod(criteria,(err, data) => {
                    if (err) {
                        console.log(data,'DAOerror----');
                        cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
                        return;
                    }
                    cb(null, data);
                    return;
                });
            }
        }, (err, response) => {
            callback(response.record);
        })
    }


    /***API to get the record detail by id */
    let getRecordById = (data, callback) => {
        async.auto({
            record: (cb) => {
                let criteria = {
                    "id":data.id
                }
                recordDAO.getRecordDetail(criteria,(err, data) => {
                    if (err) {
                        console.log(err,'error----');
                        cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
                        return;
                    }
                    cb(null, data[0]);
                    return;
                });
            }
        }, (err, response) => {
            callback(response.record);
        })
    }

module.exports = {
    createRecord : createRecord,
    updateRecord : updateRecord,
    deleteRecord : deleteRecord,
    getRecord : getRecord,
    getRecordById : getRecordById,
    getRecordByPeriod : getRecordByPeriod
};
