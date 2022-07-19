const loginErrorHandler = (err, req, res, next) => {
  if (err) return res.redirect("/failedLogin");
  else {
    next();
  }
};

const signupErrorHandler = (err, req, res, next) => {
  if (err) return res.redirect("/failedSignup");
  else {
    next();
  }
};

module.exports = { loginErrorHandler, signupErrorHandler };
