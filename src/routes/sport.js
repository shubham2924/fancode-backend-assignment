const Sport = require('../controllers/sport');
const mysql = require('../lib/mysql');
module.exports = function(app) {
    app.route('/sport/tour/match').get(async (req, res, next) => {
        try {
            return res.json(await Sport.getAllSportsToursAndMatches());
        } catch (err) {
            return next(err);
        }
    });

    app.route('/sport').post(async (req,res,next)=>{
        try {
            const insertQuery = `
            INSERT INTO mydb.sports (name)
            VALUES (?);
            `;
            
            const insertValues = [req.body.name];
            
            
            const result = await mysql.query(insertQuery, insertValues);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    app.route('/getAllSports').get(async(req,res,next)=>{
        try{
            const query = 'select * from sports';
            const result = await mysql.query(query);
            return res.json(result);
        } catch(err){
            return next(err);
        }
    })
}