const mysql = require('../lib/mysql');

const createNews = async (req, res) => {
    try {
        let extraObj = {}
        if (req.body.matchId) {
            // Fetch tourId and sportId based on the provided matchId
            const query = `
            SELECT t.id as tourId, s.id as sportId
            FROM mydb.matches m
            JOIN mydb.tours t ON m.tourId = t.id
            JOIN mydb.sports s ON t.sportId = s.id
            WHERE m.id = ?;
        `;

            const result = await mysql.query(query, req.body.matchId);

            if (!result || !result.length) {
                // Handle case where matchId doesn't exist
                return res.json({ status: 'Invalid Match ID' });
            }

            // Assign obtained tourId and sportId to feed to the insert query
            extraObj.tourId = result[0].tourId;
            extraObj.sportId = result[0].sportId;
        }

        // Insert the news into the database
        const insertQuery = `
INSERT INTO mydb.news (title, description, matchId, tourId, sportId)
VALUES (?, ?, ?, ?, ?);
`;

        const insertValues = [req.body.title, req.body.description, req.body.matchId, extraObj.tourId, extraObj.sportId];
        return await mysql.query(insertQuery, insertValues);
        // Handle successful insertion
        // return res.status(201).json({ message: 'News created successfully', newsId: insertResult.insertId });
    } catch (error) {
        // Handle insertion error
        console.error(error);
        if (res && res.json) {
            return res.json({ error: 'Something went wrong, Internal Server Error.' });
        } else {
            // If res is undefined or doesn't have a json method, log an additional error
            console.error('Error: Response object is invalid or undefined');
        }
    }
}

const getNewsByMatchId = async (req, res) => {
    const query = 'select * from news where matchId = ?';
    const parameters = [req.query.matchId];
    return await mysql.query(query, parameters);
}
const getNewsByTourId = async (req, res) => {
    const query = 'select * from news where tourId = ?';
    const parameters = [req.query.tourId];
    return await mysql.query(query, parameters);
}
const getNewsBySportId = async (req, res) => {
    const query = 'select * from news where sportId = ?';
    const parameters = [req.query.sportId];
    return await mysql.query(query, parameters);
}

module.exports = {
    createNews: createNews,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId
}