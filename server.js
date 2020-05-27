import Express from 'express';
import path from 'path';
import config from './src/server/config';
import BodyParser from 'body-parser';
import compression from 'compression';
import spdy from 'spdy';
import fs from 'fs';

// Import routes
import logRoutes from './src/server/routes/log.routes';
import gameRoutes from './src/server/routes/game.routes';

const app = new Express();

// Enable compression
app.use(
  compression({
    filter: (req, res) =>
      req.headers['x-no-compression'] ? false : compression.filter(req, res)
  })
);

// Specify body parsers
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

// Define static paths
app.use(Express.static('public'));
app.use(Express.static('dist'));

// Assign routes
app.use('/api/log', logRoutes);
app.use('/api/game', gameRoutes);

// Everything else, defer to React router
app.get(['*'], (req, res) =>
  res.sendFile(path.join(__dirname + '/public/index.html'))
);

// Start the server
spdy
  .createServer(
    {
      key: fs.readFileSync(__dirname + '/server.key'),
      cert: fs.readFileSync(__dirname + '/server.crt')
    },
    app
  )
  .listen(config.port, error => {
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      console.log(`HTTP/2 server started on port ${config.port}`);
    }
  });
// app.listen(config.port, () =>
//   console.log(`Server started on port ${config.port}`)
// );
