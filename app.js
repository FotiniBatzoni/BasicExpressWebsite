const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { application } = require('express');

const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    res.render('index');
})

app.get('/about',function(req,res){
    res.render('about');
})

app.get('/contact',function(req,res){
    res.render('contact');
})

app.post('/contact/send',function(req,res){
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'f.batzoni@gmail.com',
            pass:'m1l@nkountera'
        }
    });

    const mailOptions ={ 
        from : 'Fotini Batzoni <f.batzoni@gmail.com>',
        to: 'batzonif@outlook.com',
        subject: 'Website Submission',
        text:' Name: ' + req.body.name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
        html:'<p>You have a submission with the following details..</p><ul><li>Name: ' +req.body.name+'</li><li>Email: ' +req.body.email+'</li><li>Message: ' +req.body.message+'</li></ul>'
    };

    transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error)
            res.redirect('/')
        }else{
            console.log('Message sent ' + info.response )
            res.redirect('/')
        }
    })
})


app.listen(3000);
console.log('Server is running on port 3000 ...')