import mongoose from 'mongoose'
import authentication from './authentication'
import user from './user'

export default function() {
  const server = this;

  mongoose.connect(server.get('mongodb'))
  mongoose.Promise = global.Promise;

  server.configure(authentication)
  server.configure(user)
};
