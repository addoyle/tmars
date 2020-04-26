import Express from 'express';
import path from 'path';
import routes from './src/server/routes';
import config from './src/server/config';
import BodyParser from 'body-parser';

const app = new Express();

// Specify body parsers
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

// Assign routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname + '/public/index.html'))
);
app.use('/api', routes);

// Define static paths
app.use(Express.static('public'));
app.use(Express.static('dist'));

// Start the server
app.listen(config.port, () =>
  console.log(`Server started on port ${config.port}`)
);
