const News = require('../models/news');

const createNews = async (req,res) => {
    return await News.createNews(req,res);
}
const getNewsByMatchId = async (req,res) => {
    return await News.getNewsByMatchId(req,res);
}
const getNewsByTourId = async (req,res) => {
    return await News.getNewsByTourId(req,res);
}
const getNewsBySportId = async (req,res) => {
    return await News.getNewsBySportId(req,res);
}

module.exports = {
    createNews: createNews,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId
}