
 const express = require('express');
 const bodyParser =  require('body-parser');
 const exphbs =  require('express-handlebars');
 const nodemailer =  require('nodemailer');
const path =  require('path');

 const app = express();

// view engine setup

app.engine('handlebars', exphbs());
app.set('view engine','handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder

//app.use('/public', express.static(path.join(_dirname, 'public')));

app.get('/', (req,res) => { 
res.render('contact');
});

app.post('/send', (req,res) => { 

    const output=`
          <p> you have new message </p>
    <h3>Contact Details</h3>
    <ul>
        <li>name: ${req.body.name}</li>
    <li>email: ${req.body.email}</li>
    <li>phone: ${req.body.phone}</li>
    <li>address: ${req.body.address}</li>
    </ul>
<h3>Message</h3>
<p>${req.body.message}</p>`;
    
      let transporter = nodemailer.createTransport({
        host :'mail.traversymedia.com.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'test@traversymedia.com', // generated ethereal user
            pass: '123abc' // generated ethereal password
        },
          tls:{
          rejectUnauthorized:false
      }
          
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'santhoshsan0794@gmail.com', // sender address
        to: 'sandysanthosh101@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
       
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        
        res.render('contact',{ msg : 'Email has send'});

});
    });
 
app.listen(3000,() => console.log('server started...')); 