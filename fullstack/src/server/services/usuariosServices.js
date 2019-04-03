const bcrypt = require("bcryptjs");
const User = require("../dbmodels/usuario");
// Load input validation
// const validateRegisterInput = require("../../utils/validation/register");
// const validateLoginInput = require("../../utils/validation/login");

module.exports = {
  login: (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id
    };
    next();
  },
  register: (req, res) => {
    // Form validation
    // const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    // if (!isValid) {
    //  return res.status(400).json(errors);
    // }
    // Check if the user was already created
    User.findOne({ email: req.body.email })
    // eslint-disable-next-line consistent-return
      .then((user) => {
        if (user) {
          return res.status(400).json({ error: "Email already exists" });
        }
        // create the new user with the request body parameters
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          
          rol: req.body.rol
        });
        // Hash password before saving in database
        bcrypt.genSalt(10)
          .then((salt) => {
            // if the salt was generated, create the hash
            bcrypt.hash(newUser.password, salt)
              .then((hash) => {
                // once the hash is created, save the new user
                newUser.password = hash;
                newUser
                  .save()
                  .then(usuarioCreado => res.json(usuarioCreado))
                  .catch((err) => {
                    console.log(`Error while saving the user ${err}`);
                    return res.status(400).json({ error: "Can't register the user. Please contact website admin" });
                  });
              });
          })
          .catch((err) => {
            console.log(`Error while hashing the password ${err}`);
            return res.status(400).json({ error: "Can't register the user. Please contact website admin" });
          })
          .catch((err) => {
            console.log(`Error while generating salt for the password hash: ${err}`);
            return res.status(400).json({ error: "Can't register the user. Please contact website admin" });
          });
      })
      .catch((err) => {
        console.log(`Failed while checking if the user already exists: ${err}`);
      });
  },
  delete: (req, res) => {
    if (req.isAuthenticated()) {
      const { id } = req.params;
      if (!id) {
        User.deleteOne({ _id: id }, (err) => {
          console.log(`Error while deleting user ${err}`);
          return res.status(400).json({ error: "Can't delete the user. Please contact website admin" });
        });
      } else {
        return res.status(400).json({ error: "Can't delete the user. Check the values. Please contact website admin" });
      }
    } else {
      console.log("entro al server, /users -- NO AUTORIZADO");
      return res.status(404);
    }
  },
  getAll: async (req, res) => {
    if (req.user) {
      const users = await User.find({});
      res.json({
        "users": users.map(
          u => ({
            id: u.email,
            name: u.name,
            email: u.email,
            oid: u._id
          })
        )
      });
    } else {
      return res.status(404);
    }
  }
};
