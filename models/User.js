const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (emailInput) => {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(emailInput);
        },
        message: error => `${error} is not a valid email!`
      },
    },
    thought: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],
    friend: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friend.length;
});

const User = model('user', userSchema);


module.exports = User;
