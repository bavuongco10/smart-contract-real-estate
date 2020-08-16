const routes = require('next-routes')();

routes
  .add('/estates/new', '/estates/new')
  .add('/estates/:address', '/estates/show')
  .add('/estates/:address/requests', '/estates/requests/index')
  .add('/estates/:address/requests/new', '/estates/requests/new')
  .add('/estates/:address/transfer/new', '/estates/transfer/new')
  .add('/estates/:address/transfers', '/estates/transfers/index')

module.exports = routes;
