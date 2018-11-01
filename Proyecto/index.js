const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const productsRoutes = require('./routes/routesProducts');
const callRoutes = require('./routes/routesCall');


// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:11111111David@ds215961.mlab.com:15961/refrielectricos',{
}).then(()=>{
    console.log("Conectado a la base de datos");
}).catch((err)=>{
    console.log("Error al conectarse a la base de datos");
});

// Settings
app.set('port',process.env.PORT || 3000);

// Middle wares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Static files
app.use(express.static(path.join(__dirname,'dist')));
// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname + '/dist/index.html'))
// })
// Routes
app.use('/products',productsRoutes);
app.use('/call', callRoutes);



// Start server
app.listen(app.get('port'),()=>{
    console.log("Server on port",app.get('port'));
});
