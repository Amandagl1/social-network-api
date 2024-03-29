const router = require("express").Router();

const {

  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  // addReaction,
  // removeReaction,

  // Requiring in thoughts controller
} = require('../../controllers/thoughtsController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// router.route('/:thoughtId/reactions').post(addReaction);

// router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

