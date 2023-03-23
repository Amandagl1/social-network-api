const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtContent: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },

    reactions: [reactionSchema],
  },

  {
    toJSON: {
      getters: true
    },
    id: false,

  }
);

thoughtSchema.virtual('reactionCount').get(function() {

  return this.reactions.length
  
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
