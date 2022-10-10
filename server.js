var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/public"));
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);