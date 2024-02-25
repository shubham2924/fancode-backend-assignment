const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async params => {

    //Below is the modified SQL query
    const statement = 'select m.* from matches m join tours t on m.tourId = t.id where t.name = ?';

    //Problem statement extension
    //The endpoint latency increases linearly with the number of tours. Modify the endpoint to increase the performance.
    //Solution: I'll create appropriate indexes on specific columns of the tables to increase the efficiency of my API, I've included index creation SQL query in migration/base.sql file.
    const parameters = [ params.name ];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}