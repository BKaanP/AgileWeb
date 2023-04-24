const port = 3000,
  http = require("http"),
  httpStatusCodes = require("http-status-codes"),
  router = require("./router"),
  fs = require("fs"),
  plainTextContentType = {
    "Content-Type": "text/plain",
  },
  htmlContentType = {
    "Content-Type": "text/html",
  },
  customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
      if (errors) {
        console.log("Error reading the file...");
      }
      res.end(data);
    });
  };
router.get("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType);
  customReadFile("public/index.html", res);
});
router.get("/info", (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType);
  customReadFile("public/info.html", res);
});
http.createServer(router.handle).listen(port);
console.log(`The server is listening on port number:
➥ ${port}`);
