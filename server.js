const express = require("express")
const app = express()

import path from 'path';

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')));
app.use(express.static('public'));
app.use(express.static('dist'));

app.listen(3000,  () => console.log("Server started at http://localhost:3000"));
