const News = require('../controllers/news');

module.exports = function(app) {
    app.route('/getallnews').get(async (req, res, next) => {
        try {
            const query = 'select * from news';
            const result = await mysql.query(query);
                        return res.json(result);
        } catch (err) {
            return next(err);
        }
    });
    
    app.route('/getNewsByMatchId').get(async (req, res, next) => {
        try {
            let result = await News.getNewsByMatchId(req);;
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    app.route('/getNewsByTourId').get(async (req, res, next) => {
        try {
            let result = await News.getNewsByTourId(req);
             return res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    app.route('/getNewsBySportId').get(async (req, res, next) => {
        try {
            let result = await News.getNewsBySportId(req);
             return res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    app.route('/createnews').post(async (req, res, next) => {
        try {
            let result = await News.createNews(req);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });
}