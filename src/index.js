const port = process.env.PORT;
const debug = require('debug');
const conf = require('./conf/settings');
const hapi = require('hapi');
const pug = require('pug');
const routes = require('./routes');

// create new server
const server = new hapi.Server(conf.get('hapi:conf'));
server.connection({ port: port || 8080, routes: { cors: true } });

//register plugins
server.register(require('inert'), (err) => {
  if (err) {
    debug('Failed to load inert');
  }
  server.route(routes);
});

server.register(require('vision'), (err) => {
  if (err) {
    debug('Failed to load vision');
  }
  server.views({
    engines: { pug },
    path: __dirname,
    compileOptions: { pretty: true },
    isCached: conf.get('NODE_ENV') !== 'development'
  })
});

server.on('request-error', (request, err) => {
  const errMsg = (err.trace || err.stack || err);
  debug(`Error response (500) sent for request: ${request.id} because: ${errMsg}`);
});

server.start(() => {
  debug('Server running at:', server.info.uri);
});