import Express from 'express';
import path from 'path';
import routes from './src/server/routes';
import config from './src/server/config';

const app = new Express();

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')));
app.use('/api', routes);

app.use(Express.static('public'));
app.use(Express.static('dist'));

app.listen(config.port,  () => console.log(`Server started on port ${config.port}`));
