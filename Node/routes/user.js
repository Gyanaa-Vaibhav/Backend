const { Router } = require('express');

const authorRouter = Router();

authorRouter.get('/',(req,res)=>{
    res.send("<h1>Sending All the Users</h1>")
})

authorRouter.get('/:id',(req,res)=>{
    res.send(`<h1>Sending Users with the id of ${req.params.id}</h1>`)
})

module.exports = authorRouter;
