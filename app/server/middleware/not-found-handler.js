import errors, { NotFound } from 'feathers-errors'

export default () => {
  return function(req, res, next) {
    next(new NotFound('Page not found'))
  }
}
