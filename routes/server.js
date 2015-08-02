module.exports = function(userInfo) {
  return {
    index: function(req, res) {
      res.render('index', { user: userInfo });
    },
    partials: function (req, res) {
      var name = req.params.name;
      res.render('partials/' + name);
    }
  };
};
