var express = require('express');
var nodemailer = require('nodemailer');


var app = express();

var smtpTransport = nodemailer.createTransport("SMTP", {

    service: 'Gmail',
    auth: {
        user: 'correo@gmail.com',
        pass: 'contraseña'
    }
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});

app.get('/send', function (req, res) {

    var mailFrom = {
        to: req.query.to,
        subject: "Contacto: "+ req.query.affair,
        from: "Contacto"+ req.query.from,
        html:  "De: " + req.query.name + "<br>" +
               "Usuario: " + req.query.user + "<br>" +     "Mensaje: " + req.query.text
    }
     var mailTo = {
        to: req.query.user,
        subject: "Contacto Logros",
        from: req.query.to,
        html:  req.query.name + "<br>" +"Gracias, su mensaje a sido resibido, le responderemos lo mas pronto posible. " + "<br>"+"Mensaje enviado:"+ req.query.text
    }

   console.log(mailFrom);
    smtpTransport.sendMail(mailFrom, function (err, response) {
        if (err) {
           console.log(err);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
     console.log(mailTo);
    smtpTransport.sendMail(mailTo, function (err, response) {
        if (err) {
           console.log(err);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

app.listen(9090, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port on 9090");
    }
});
