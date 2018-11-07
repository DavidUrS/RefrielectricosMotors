const router = require('express').Router();
const dbConnection = require('../config/db');
const connection = dbConnection();

router.post('/',(req,res)=>{
    let {phone, name} = req.body;
    connection.query(`INSERT INTO llamadas (numero, nombre) VALUES("${phone}", "${name}")`,(error, results, fields)=>{
        if(error){
            res.json('Ocurrió un error', error);
        }
        res.json("Te llamaremos pronto");
    })
})

module.exports = router;