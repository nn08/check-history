let dbConfig = require("../Utilities/mysqlConfig");



let getRecord = (criteria, callback) => {
    //criteria.aricle_id ? conditions += ` and aricle_id = '${criteria.aricle_id}'` : true;
    dbConfig.getDB().query(`select * from record where 1`,criteria, callback);
}

let getRecordDetail = (criteria, callback) => {
	let conditions = "";
    criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
    dbConfig.getDB().query(`select * from record where 1 ${conditions}`, callback);
}

let getRecordDetailByPeriod = (criteria, callback) => {
	var conditions = "";
    criteria.period ? conditions += ` and r.period = '${criteria.period}'` : true;
    criteria.id ? conditions += ` and r.employee_id = '${criteria.id}'` : true;
    //console.log("select r.period, r.skill_id, s.skill_item, r.rating, r.comment from record r left join skills_description s on r.skill_id=s.skill_id where 1 ",conditions)
    dbConfig.getDB().query(`select r.period, r.skill_id, s.skill_item, r.self_rating, r.comment from record r left join skills_description s on r.skill_id=s.skill_id where 1 ${conditions}`, callback);
}

let createRecord = (dataToSet, callback) => {
    console.log("insert into record set ? ", dataToSet,'pankaj')
    dbConfig.getDB().query("insert into record set ? ", dataToSet, callback);
}

let deleteRecord = (criteria, callback) => {
    let conditions = "";
   criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
   console.log(`delete from record where 1 ${conditions}`);
   dbConfig.getDB().query(`delete from record where 1 ${conditions}`, callback);

}

let updateRecord = (criteria,dataToSet,callback) => {
	let conditions = "";
    let setData = "";
    criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
    dataToSet.rating ? setData += `rating = '${dataToSet.rating}'` : true;
    dataToSet.period ? setData += `, period = '${dataToSet.period}'` : true;
    console.log(`UPDATE record SET ${setData} where 1 ${conditions}`);
    dbConfig.getDB().query(`UPDATE record SET ${setData} where 1 ${conditions}`, callback);
}
module.exports = {
    getRecord : getRecord,
    createRecord : createRecord,
    deleteRecord : deleteRecord,
    updateRecord : updateRecord,
    getRecordDetail : getRecordDetail,
    getRecordDetailByPeriod : getRecordDetailByPeriod
}
