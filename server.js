const { Storage } = require("@google-cloud/storage");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 81;
const path = require("path");

app.use(cors());
const cloudStorage = new Storage();
const bucketName = "test-anh";
const bucket = cloudStorage.bucket(bucketName);

app.use(express.static(path.join(__dirname, "public")));


app.get("/", function (req, res) {
	res.send("hello");
  //res.sendFile(path.join(__dirname, "/client/index.html"));
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

