module.exports = function(apiHandler) {
  var nodemailer = require('nodemailer');
  var mongoose = require('mongoose');
  var phantom = require('phantom');
  var PhantomPDF = require('phantom-pdf');

	function evaluate(page, func) {
	    var args = [].slice.call(arguments, 2);
	    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
	    return page.evaluate(fn);
	}

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

          	page.open("http://localhost:8080/generate_report", function() {

          		var foo = "https://www.redditstatic.com/about/assets/reddit-logo.png";

          		evaluate(page, function(foo) {
				    // this code has now has access to foo
				    document.getElementsByTagName('img')[0].src = foo;
				  }, foo);

				setTimeout(function() {
					console.log("RENDER");
					page.render("test.png", {format: 'png', quality: '100'}, function() {
		          		res.download('test.png', function(err) {
		          		});
			            ph.exit();
			        });
				}, 1000);
          	});
        });
      });
    });

  	res.json({ status: "ok"});

  };

};