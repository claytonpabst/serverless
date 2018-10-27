import * as fs from "fs";
import * as bodyParser from "body-parser";
import * as Mustache from "mustache";

import * as path from "path";
import * as serverless from "serverless-http";
import * as express from "express";

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// renders component HTML
function loadHTML() {
  return fs.readFileSync("./dist/index.html").toString();
}

app.get("/", function(req, res) {
  res.send("hit")
  fs.readFile("./dist/index.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/client/*", function(req, res) {
  let resource = req.path.replace("/client", "");
  fs.readFile("./dist/" + resource, "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/*", function(req, res) {
  let resource = req.path.replace("/", "");
  fs.readFile("./dist/" + resource, "utf-8", (err, data) => {
    res.send(data);
  });
  var html = Mustache.to_html(loadHTML());
  res.send(html);
});

module.exports.handler = serverless(app);
