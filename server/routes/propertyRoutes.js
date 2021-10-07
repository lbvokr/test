const router = require('express').Router();
const Property = require('../models/property');

router.route('/').get(async (req, res, next) => {
    const properties = await Property.find({}) // find all property objects
    res.status(200).json(properties); // return all properties
});

router.get('/:query', async (req, res) => {
    const properties = await Property.find({"name":{'$regex':req.params.query}})
  
    if (properties) { // if user found return that
        res.status(200).json(properties)
    } 
});

router.post('/insert', async (req, res) => {
    const property = new Property(req.body);
    property.save();
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Property.findByIdAndRemove(id).exec();
        res.send("Deleted");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
