const { Schema, Types } = require('mongoose');
const moment = require("moment");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },

    reactionContent: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    }
  },
  
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = reactionSchema;
