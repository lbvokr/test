const router = require('express').Router();
const Agent = require('../models/agent');

router.route('/').get(async (req, res, next) => {
    const agents = await Agent.find({}) // find all property objects
    res.status(200).json(agents); // return all properties
});

router.get('/:query', async (req, res) => {
    const agents = await Agent.find({"name":{'$regex':req.params.query}})
  
    if (agents) { // if user found return that
        res.status(200).json(agents)
    }
});

router.post('/insert', async (req, res) => {
    const agent = new Agent(req.body);
    agent.save();
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Agent.findByIdAndRemove(id).exec();
        res.send("Deleted");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
