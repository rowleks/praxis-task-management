const mongoose = require('mongoose')
const toJSONPlugin = require('./toJSON.plugin')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
)

userSchema.plugin(toJSONPlugin)

// Cascade delete user's tasks when a user document is deleted
userSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function () {
    await mongoose.model('Task').deleteMany({ userId: this._id })
  }
)

module.exports = userSchema
