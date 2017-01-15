import path from 'path'
import handler from 'feathers-errors/handler'
import notFound from './not-found-handler'
import logger from './logger'
import ssr from './ssr'

export default function() {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this

  // All GET requests to unknown paths go through React's index to facilitate
  // React Router. Feathers middleware should go above here.
  app.get('*', ssr)

  app.use(notFound())
  app.use(logger(app))
  app.use(handler())
}
