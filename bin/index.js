const app = require('../app');
const http = require('http');
const mongoose = require('mongoose');

normalizePort = (val) => {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/samwoo';
mongoose.connect(MONGO_URL, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB error: ${err}`);
  process.exit(-1);
});

let port = normalizePort(process.env.PORT || '3000');
let server = http.createServer(app);

server.listen(port);
server.on('error', (err) => {
  if (err.syscall !== 'listen') {
    throw err;
  }
  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (err.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw err;
  }
});

server.on('listening', () => {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log(`Listening on ${bind}`);
});