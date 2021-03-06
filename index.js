var express = require('express');
var app = express();
var path    = require("path");

app.use('/js', express.static('js'));
app.use('/node_modules', express.static('node_modules'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
