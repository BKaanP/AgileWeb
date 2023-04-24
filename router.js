const httpStatus = require("http-status-codes");
const htmlContentType = {
  "Content-Type": "text/html",
};

function sendIndexPage(req, res) {
  res.writeHead(httpStatus.OK, htmlContentType);
  customReadFile("views/index.html", res);
}
function sendInfoPage(req, res) {
  res.writeHead(httpStatus.OK, htmlContentType);
  customReadFile("views/info.html", res);
}

const routes = {
  GET: {
    "/info": sendInfoPage,
    "/": sendIndexPage,
  },
  POST: {},
};

exports.handle = (req, res) => {
  try {
    if (routes[req.method][req.url]) {
      routes[req.method][req.url](req, res);
    } else {
      res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
      res.end("<h1>No such file exists</h1>");
    }
  } catch (ex) {
    console.log("error: " + ex);
  }
};

exports.get = (url, action) => {
  routes["GET"][url] = action;
};

exports.post = (url, action) => {
  routes["POST"][url] = action;
};
