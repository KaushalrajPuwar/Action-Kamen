exports.get_landing = function (req, res, next) {
  console.log(req.oidc.isAuthenticated());
  res.render("landing");
};
