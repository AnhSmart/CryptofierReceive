const { Storage } = require("@google-cloud/storage");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 80;
const path = require("path");

app.use(cors());
const cloudStorage = new Storage();
const bucketName = "test-anh";
const bucket = cloudStorage.bucket(bucketName);
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

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

app.use(express.static("public"));
