const { Storage } = require("@google-cloud/storage");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const path = require("path");

app.use(cors());
const cloudStorage = new Storage();
const bucketName = "test-anh";
const bucket = cloudStorage.bucket(bucketName);
app.get("/download", async function (req, res, next) {
  // Downloads the file to the destination file path
  // const file = cloudStorage
  //   .bucket(bucketName)
  //   .file("image1.jpg")
  //   .download(function (err, contents) {});
  // console.log(`gs://${bucketName}/"image1.jpg" downloaded to.`);
  // res.send(file);

  let filename = req.query.filename;
  //let contetType = "image/jpg;";
  res.writeHead(200, {
    "Content-Disposition": `attachment;filename=${filename}`,
    //"Content-Type": `${contetType}`,
  });
  await cloudStorage
    .bucket(bucketName)
    .file(`${filename}`)
    .createReadStream() //stream is created
    .pipe(res);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

app.use(express.static("public"));
