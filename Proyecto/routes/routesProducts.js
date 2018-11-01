const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/products');
const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

router.get('/', (req, res) => {
    Product.find( {}, { category: 1, name:1, cover:1, price:1 },(err,categories)=>{
        res.json(categories);
    });
});


router.get('/datos-falsos',(req, res)=>{
    for(let i=1; i<2;i++){
        const product = new Product();
        product.category = faker.commerce.department();
        product.name = faker.commerce.productName();
        product.price = faker.commerce.price();
        product.cover = i;
        product.save(err=>{
            if (err) {return next(err);}
        });
    }
    res.redirect('/');
});

router.post('/correo/:email',(req,res)=>{
    var datos = req.body;
    console.log();
    lista = "<html><head></head><body style='color:black;'>";
    lista += "<center><img width='40%;' src='https://scontent.fbaq6-1.fna.fbcdn.net/v/t1.0-9/34601342_1476799632420794_5177331613582753792_n.jpg?_nc_cat=111&_nc_ht=scontent.fbaq6-1.fna&oh=480078bd3ad2d7a7415c560271ce2cc8&oe=5C444EE2'></br><h2 style='color:black;'>Cotización Refrielectricos Motors SAS</h2><hr><table style='text-align:center; color:black;' cellpadding='3'><tr><th>Nombre</th><th>Precio</th><th>N° de unidades</th><th>Sub Total</th></tr>";
    total = 0;
    datos.forEach(element=>{
        total+= element.sub_total;
        lista+= "<tr><td>"+element.nombre+"</td><td>"+element.precioUnitario+"</td><td>"+element.unidades+"</td><td>"+element.sub_total+"</td></tr>";
    })
    lista += "</table><h3 style='color:black;'>Total "+"$"+total+"</h3><em style='color:black;'>Esta cotización puede estar sujeta a cambios, puedes contactarnos para confirmar precios y ofrecerte <b> DESCUENTOS</b>.</em><br><em style='color:black;'>Visitanos en: <a href='www.refrielectricosmotors.com'>Refrielectricosmotors.com</a></em><br><em style='color:black;'>Celular 3008132438, también WhatsApp</em></center><br><hr></body></html>"
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'refrielectricosmotors@gmail.com',
          pass: 'A73009037c'
        }
      });
      var mailOptions = {
        from: 'refrielectricosmotors@gmail.com',
        to: [req.params.email,'refrielectricosmotors@gmail.com'],
        subject: 'Cotización Refrielectricos Motors',
        html: lista
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.json(error)
        } else {
          console.log('Correo enviado correctamente: ' + info.response);
          res.json("correcto")
        }
      });
    
})

module.exports = router;
