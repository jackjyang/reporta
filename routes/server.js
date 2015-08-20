module.exports = function(userInfo, config) {
  return {
    index: function(req, res) {
      res.render('index', { user: userInfo, config: config });
    },
    partials: function (req, res) {
      var name = req.params.name;
      res.render('partials/' + name);
    },
    modals: function (req, res) {
      var name = req.params.name;
      res.render('modals/' + name);
    }

  };
};
