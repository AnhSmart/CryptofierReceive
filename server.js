const { Storage } = require("@google-cloud/storage");
const cors = require("cors");

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');


app = express();
app.use(serveStatic(__dirname + "/public"));


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/client/index.html'))
})

const cloudStorage = new Storage();
const bucketName = "test-anh";
const bucket = cloudStorage.bucket(bucketName);
app.get("/download", async function (req, res, next) {
  let filename = req.query.filename;
  await cloudStorage
    .bucket(bucketName)
    .file(`${filename}`)
    .createReadStream() //stream is created
    .pipe(res);
  res.writeHead(200, {
    "Content-Disposition": `attachment;filename=${filename}`
  });
  
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);