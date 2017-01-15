import authentication from 'feathers-authentication'

export default function() {
  const server = this

  let config = server.get('auth')

  server.configure(authentication(config))
}
