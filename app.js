var express = require('express')
  , http = require('http')
  , path = require('path')
  , nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "ecommercemonk@gmail.com",
        pass: "XXX"
    }
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler());

// home
app.get('/', function(req,res){
	res.sendfile('index.html');
});

//contact us
app.post('/contactus',function(req,res){

	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var website = req.body.website;
	var message = req.body.message;

	var body = "Name:" + firstname+" "+lastname + "<br>" + 
			   "Email:" + email + "<br>" + 
			   "Website:" + website + "<br>" + 
			   "Message:" + message;
	var mailOptions = {
	    from: "ecommercemonk@gmail.com",
	    to: "ecommercemonk@gmail.com",
	    subject: "new enquiry on ecommercemonk.com",
	    text: body,
	    html: body
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        res.json({error: true});
	    }else{
	        res.json({success: true});
	    }
	});
});

// 404
app.get('*', function(req,res){
	res.sendfile('404.html');
});

http.createServer(app).listen(app.get('port'));
