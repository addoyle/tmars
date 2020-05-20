import Express from 'express';
import path from 'path';
import config from './src/server/config';
import BodyParser from 'body-parser';

// Import routes
import log from './src/server/routes/log.routes';
import game from './src/server/routes/game.routes';

const app = new Express();

// Specify body parsers
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

// Define static paths
app.use(Express.static('public'));
app.use(Express.static('dist'));

// Assign routes
app.use('/api/log', log);
app.use('/api/game', game);

// Everything else, defer to React router
app.get(['*'], (req, res) =>
  res.sendFile(path.join(__dirname + '/public/index.html'))
);

// Start the server
app.listen(config.port, () =>
  console.log(`Server started on port ${config.port}`)
);
