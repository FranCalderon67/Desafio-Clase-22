const path = require("path");

const loginErrorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err);
    return res.render(path.join(process.cwd(), "./public/hbsViews/errorLogin.hbs"));
  } else {
    next();
  }
};

const signupErrorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err);
    return res.render(path.join(process.cwd(), "./public/hbsViews/errorSignup.hbs"));
  } else {
    next();
  }
};

module.exports = { loginErrorHandler, signupErrorHandler };
