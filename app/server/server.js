import Feathers from 'feathers'
import path from 'path'

import compression from 'compression'
import cors from 'cors'
import favicon from 'serve-favicon'
import configuration from 'feathers-configuration'
import hooks from 'feathers-hooks'
import rest from 'feathers-rest'
import bodyParser from 'body-parser'
import socketio from 'feathers-socketio'
import Promise from 'bluebird'

import services from './services'
import middleware from './middleware'

let server = new Feathers()
process.env.ON_SERVER = true

server.configure(configuration(path.join(__dirname, '..')))

server.use(compression())
  .options('*', cors())
  .use(cors())
  // .use(favicon( path.join(server.get('public'), 'favicon.ico') ))
  .use('/', Feathers.static(server.get('public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

if (process.env.NODE_ENV !== 'production') {
  server.use('/assets', Feathers.static(server.get('assets')))
}



// mock apis
server.get('/api/questions', (req, res)=> {
  let { questions } = require('./mock_api')
  res.send(questions)
})

server.get('/api/users/:id', (req, res)=> {
  let { getUser } = require('./mock_api')
  res.send(getUser(req.params.id))
})
server.get('/api/questions/:id', (req, res)=> {
  let { getQuestion } = require('./mock_api')
  let question = getQuestion(req.params.id)
  if (question) {
    res.send(question)
  } else {
    res.status(404).send({ reason: 'question not found' })
  }
})

server.use((err, req, res, next)=> {
  console.log(err.stack)
  // TODO report error here or do some further handlings
  res.status(500).send("something went wrong...")
})

console.log(`Server is listening to port: ${server.get('port')}`)
server.listen(server.get('port'))
