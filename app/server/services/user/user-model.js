// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  tenantId: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
})

const userModel = mongoose.model('user', userSchema)

export default userModel
