import service from 'feathers-mongoose'
import user from './user-model'
import hooks from './hooks'

export default function() {
  const server = this;

  const options = {
    Model: user,
    paginate: {
      default: 5,
      max: 25
    },
    lean: true
  };

  // Initialize our service with any options it requires
  server.use('/api/users', service(options));

  // Get our initialize service to that we can bind hooks
  const userService = server.service('/api/users');

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
};
