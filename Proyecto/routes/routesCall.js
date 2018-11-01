const router = require('express').Router();
const Call = require('./../models/call');

router.post('/',(req,res)=>{
    const newCall = new Call({
        phone: req.body.phone,
        name: req.body.name
    })
    newCall.save((err,call)=>{
        if(err){res.json("Hubo un error al registrar la llamada")}
        else{
            res.json("Te llamaremos pronto")
        }
    })
})

module.exports = router;