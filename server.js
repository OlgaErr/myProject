const express = require('express');

const app = express();
const PORT = process.env.PORT = 3000;

app.get('/', function(req, res){
    res.sendfile('board.html', { root: __dirname + "/client" } );
});

app.use(express.static('client'));

app.listen(PORT, () => {
  console.log('Server is running at:', PORT);
});