const router = require('express').Router();
const News = require('../models/news');

router.route('/').get(async (req, res, next) => {
    const news = await News.find({}) // find all property objects
    res.status(200).json(news); // return all properties
});

router.get('/:query', async (req, res) => {
    const news = await News.find({"title":{'$regex':req.params.query}});
  
    if (news) { // if user found return that
        res.status(200).json(news)
    }
});

module.exports = router;
