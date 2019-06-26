const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const db = require('./db.js');
const routes = require('./routes');

app.use(compression());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

const cookieSessionMiddleware = cookieSession({
  secret: `I'm always angry.`,
  maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
  cookieSessionMiddleware(socket.request, socket.request.res, next);
});

if (process.env.NODE_ENV != 'production') {
  app.use(
    '/bundle.js',
    require('http-proxy-middleware')({
      target: 'http://localhost:8081/'
    })
  );
} else {
  app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use('/', routes);

server.listen(8080, function() {
  console.log("I'm listening.");
});
//!socket.request.session ||
io.on('connection', function(socket) {
  // if (!socket.request.session.userId) {
  //   return socket.disconnect(true);
  //}

  db.getChat(socket.request.session.hood).then(({ rows }) => {
    socket.emit('chatMessages', {
      messages: rows.reverse()
    });
  });

  socket.on('chatMessage', async message => {
    const newMessage = await db.addMessage(
      socket.request.session.userId,
      message
    );
    const user = await db.getUser(socket.request.session.userId);
    io.emit('chatMessage', {
      id: newMessage.rows[0].id,
      message: newMessage.rows[0].message,
      created_at: newMessage.rows[0]['created_at'],
      first: user.rows[0].first,
      user_id: user.rows[0].id,
      last: user.rows[0].last,
      img_url: user.rows[0].img
    });
  });
});
