var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/client"));
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/client/index.html'))
})

app.get("/download", async function (req, res, next) {

  let filename = req.query.filename;
  res.writeHead(200, {
    "Content-Disposition": `attachment;filename=${filename}`
  });
  await cloudStorage
    .bucket(bucketName)
    .file(`${filename}`)
    .createReadStream() //stream is created
    .pipe(res);
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);