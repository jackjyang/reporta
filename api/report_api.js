module.exports = function(apiHandler) {
  var nodemailer = require('nodemailer');
  var mongoose = require('mongoose');
  var recipeModel = mongoose.model('recipe');
  var phantom = require('phantom');
  var PhantomPDF = require('phantom-pdf');
  var formatType = 'pdf';
  var fs = require("fs");

	function evaluate(page, func) {
	    var args = [].slice.call(arguments, 2);
	    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
	    return page.evaluate(fn);
	}

  function sendEmail(address, reportName) {
  	console.log("SENDING")

	var smtpTransport = nodemailer.createTransport({
	   service: "Gmail",  // sets automatically host, port and connection security settings
	   auth: {
	       user: "demo.reporta@gmail.com",
	       pass: "wololofydp"
	   }
	});

	var mailOptions = {
		from: 'demo.reporta@gmail.com',
		to: address,
		subject: 'Generated Reporta Document',
		attachments: [
        {   // file on disk as an attachment
            filename: reportName,
            path: 'generated_reports/' + reportName
        }]
	};
	smtpTransport.sendMail(mailOptions, function (err, info){
		// If a problem occurs, return callback with the error
		if(err) 
			console.log(err)
		else {
			console.log(info);
			fs.unlink('generated_reports/' + reportName, function(err) {
			   if (err) {
			       return console.error(err);
			   }
			   console.log("Deleted report file");
			});
		}
	});
  }

  function generateFileName(date, recipeName) {
  	return recipeName + ':' + date.toDateString() + "." + formatType;
  }

  apiHandler.generateReport = function(res, req) {

  	var date = new Date();

    var data = req.method == 'GET' ? req.query : req.body;

  	recipeModel.findOne({ owner_id: data.userId, name: data.recipeName }, function(err, recipe) {
  		console.log(recipe);
	    phantom.create(function (ph) {
	      ph.createPage(function (page) {
	      	page.set('content', recipe.content);

	        page.set('paperSize', {
	          	format: 'A4'
	        }, function() {

	          	// page.open(recipe.content, function() {

	    //       		var foo = "https://www.redditstatic.com/about/assets/reddit-logo.png";

	    //       		evaluate(page, function(foo) {
					//     document.getElementsByTagName('img')[0].src = foo;
					// }, foo);

					setTimeout(function() {
						console.log("RENDER");
						page.render("generated_reports/" + generateFileName(date, recipe.name), {format: formatType, quality: '100'}, function() {
			          		res.download(generateFileName(date, recipe.name), function(err) {
			          			sendEmail(data.email, generateFileName(date, recipe.name));
			          		});
				            ph.exit();
				        });
					}, 5000);
	          	// });
	        });
	      });
	    });
	    res.json({ status: "ok"});
    });
  };

};