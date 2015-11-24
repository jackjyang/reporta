

var Handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
var phantom = require('phantom');
var PhantomPDF = require('phantom-pdf');
function guid() { // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
APIHandler.prototype.generateReportWithDataHTML = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var uniqueId = guid();
  var templateData = JSON.parse(req.body.data);
  console.log(templateData);

  fs.readFile(path.join(__dirname, '../tmp/pg4.hbs'), 'utf8', function (err, data) {

    var template = Handlebars.compile(data);
    var result = template(templateData);
    var resultFile = path.join(__dirname, '../tmp/' + uniqueId + '.html');
    fs.writeFile(resultFile, result, function(err) {
      if (err)
      console.log(err);
      res.download(resultFile, resultFile, function(err) {
        fs.unlinkSync(resultFile);
      });
    });
  });
};

APIHandler.prototype.generateReportWithDataPDF = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var uniqueId = guid();
  var templateData = JSON.parse(req.body.data);
  console.log(templateData);

  fs.readFile(path.join(__dirname, '../tmp/pg4.hbs'), 'utf8', function (err, data) {

    var template = Handlebars.compile(data);
    var result = template(templateData);
    var resultFile = path.join(__dirname, '../tmp/' + uniqueId + '.html');
    fs.writeFile(resultFile, result, function(err) {
      if (err)
        console.log(err);

      phantom.create(function (ph) {
        ph.createPage(function (page) {
          page.set('paperSize', {
            format: 'A4'
          }, function() {
            page.open(resultFile, function start(status) {

              page.render(resultFile + '.pdf', {format: 'pdf', quality: '100'}, function() {
                res.download(resultFile + '.pdf', resultFile + '.pdf', function(err) {
                  fs.unlinkSync(resultFile);
                  fs.unlinkSync(resultFile + '.pdf');
                });
              });
            });
          });
        });
      });
    });
  });
};