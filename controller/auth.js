const appRoot = require("app-root-path");
const bcrypt = require("bcrypt");
const logger = require(appRoot + "/util/logger");
const User = require(appRoot + "/model/user");

class AuthController {
  getSignup = (req, res, next) => {
    res.render("signup");
  };

  signup = (req, res, next) => {
    const email = req.body.email;
    bcrypt
      .hash(req.body.password, 12)
      .then((hashedPassword) => {
        logger.info(`Pass: ${req.body.password} => ${hashedPassword}`);
        const user = new User({
          email: email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((user) => {
        logger.info("User Saved!");
        logger.info(user);
        req.session.user = user;
        req.session.save(err => {
          res.redirect("/");
        })
      });
  };

  getLogin = (req, res, next) => {
    res.render("login");
  };

  login = (req, res, next) => {
    const email = req.body.email;
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        logger.info(`No such user: ${email}`);
        res.redirect("/login");
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if(result) {
              logger.info("Login successful");
              req.session.user = user;
              req.session.save(err => {
                res.redirect("/");
              })
            } else {
              logger.info(`Wrong password!`);
              res.redirect("/login");
            }            
          })        
      }
    });
  };

  logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/");
  };
}

module.exports = AuthController;
