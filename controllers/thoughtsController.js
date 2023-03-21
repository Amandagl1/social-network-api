const { User, Thought } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    // Get all thoughts
    Thought.find()
      // Sort by the most recently created post first to the earliest post
      .sort({ createdAt: -1 })
      .then((thoughtData) => { res.json(thoughtData) })
      // If error, return 500 error status
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  getSingleThoughts(req, res) {
    // Get thought by id
    Thought.findOne({ _id: req.params.Id })
      .then((thoughtData) => {
        // If no data, return 404 status error
        if (!thoughtData) {
          return res.status(404).json();
        }
        res.json(thoughtData);
      })

      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  createThought(req, res) {
    Thought.create(req.body).then((thoughtData) => {
      // Find id and push new thought
      return User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true });
    
      }).then((userData) => {
        if(!userData) {
          return res.status(404).json();
        }
        return res.json(thoughtData)
      })

      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      // Validation for findOneAndUpdate()
      { runValidators: true, new: true })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json();
        } 
        res.json(thoughtData)
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((thoughtData) => {
      if (!thoughtData) {
        return res.status(404).json();
      }
      return User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        // Removes instances of thought id
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
    })
    .then((UserData) => {
      if (!UserData) {
        return res.status(404).json();
      }
      res.json();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  },
};

module.exports = thoughtController;