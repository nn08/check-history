let mysqlConfig = require("../Utilities/mysqlConfig");

let initialize = () => {
    mysqlConfig.getDB().query("create table IF NOT EXISTS recordNew (period VARCHAR(6), id VARCHAR(5), description VARCHAR(131), rating INT(1), comment VARCHAR(100))");

}

module.exports = {
    initialize: initialize
}
