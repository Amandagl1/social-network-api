const { User, Thought } = require("../models");

const userController = {

  getAllUsers(req, res) {
    // Get all users
    User.find()
      // Do not get the version of each user
      .select("-__v")
      .sort({ _id: -1 })
      .then((userData) => { res.json(userData) })

      // If error, return 500 error status
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  // Get one user by id
  getSingleUser(req, res) {

    User.findOne({ _id: req.params.userId })
      
      .populate('thoughts')
      .populate('friends')
      .select('-__v')

      .then((userData) => {
        // If no data, return 404 status error
        if (!userData) {
          return res.status(404).json();
        }
        res.json(userData);
      })

      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  // Create user
  createUser(req, res) {
    User.create(req.body).then((userData) => {
      res.json(userData);
    })

      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  // Find a user by id and update
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      // Validation for findOneAndUpdate()
      { runValidators: true, new: true })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json();
        }
        res.json(userData)
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  // Delete a user by id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json();
        }
      })
      .then(() => {
        res.json({message: 'User successfully deleted.'});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

  },
};

module.exports = userController