module.exports = function(apiHandler) {

  apiHandler.acerta = function(res, req) {
    var exec = require('child_process').exec;
    var data = req.method == 'GET' ? req.query : req.body;

    exec('python acerta_api/' + data.func + '.py ' + data.param,
      function (err, stdout, stderr) {
        var data = req.method == 'GET' ? req.query : req.body;

        var response;
        if (err)
          response = { status: "error", message: stderr };
        else
          response = { status: "ok", message: JSON.parse(stdout) };
        res.json(response);
      });
  };
};
