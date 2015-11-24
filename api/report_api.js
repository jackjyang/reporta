module.exports = function(apiHandler) {
  var nodemailer = require('nodemailer');
  var mongoose = require('mongoose');
  var phantom = require('phantom');
  var PhantomPDF = require('phantom-pdf');

  function sendEmail() {
  	console.log("SENDING")

	var smtpTransport = nodemailer.createTransport({
	   service: "Gmail",  // sets automatically host, port and connection security settings
	   auth: {
	       user: "",
	       pass: ""
	   }
	});

	var mailOptions = {
		from: 'no-reply@yourapp.com',
		to: 'alqiluo@gmail.com',
		subject: 'test',
		text: 'testing'
	};
	smtpTransport.sendMail(mailOptions, function (err, info){
		// If a problem occurs, return callback with the error
		if(err) 
			console.log(err)
		else
			console.log(info);
	});

	console.log("SENT")
  }

  function getTemplateContent(recipe) {

  }

  apiHandler.generateReport = function(res, req) {

    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    var recipeId = data.recipeId;
    var email = data.email;

    phantom.create(function (ph) {
      ph.createPage(function (page) {
        page.set('paperSize', {
          format: 'A4'
        }, function() {
          page.open("http://localhost:8080/generate_report", function (status) {
			page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {

				page.evaluate(page, function () {
				    $("#image").attr("src", 'http://www.redditstatic.com/about/assets/reddit-logo.png');
				});

		        page.render("test.pdf", {format: 'pdf', quality: '100'}, function() {
	              res.download('test.pdf', function(err) {
	                
	              });
	              ph.exit();
	            });
			    
		  	});        
          });
        });
      });
    });

  	res.json({ status: "ok"});

  };

};