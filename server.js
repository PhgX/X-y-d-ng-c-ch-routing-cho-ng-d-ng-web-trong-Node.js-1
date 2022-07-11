const http = require("http");
const url = require("url");
const stringDecoder = require("node:string_decoder").StringDecoder;

let sever = http.createServer((req, res) => {
  let parseUrl = url.parse(req.url, true);
  let path = parseUrl.pathname;
  let trimPath = path.replace(/^\/+|\/+$/g, "");


//   console.log(trimPath);

  req.on("data", (data) => {});
  req.on("end", (end) => {
    let chosenHandler =
      typeof router[trimPath] !== undefined
        ? router[trimPath]
        : handler.notFound;
    let data = {
      'trimPath': trimPath,
    };

    chosenHandler(data, function (statusCode, payload) {
        statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
        payload = typeof (payload) == 'object' ? payload : {};
        var payLoadString = JSON.stringify(payload);
        res.writeHead(statusCode)
        res.end(payLoadString);
      console.log("status " + statusCode + "payload" + payload);
    });
  });
});

sever.listen(3000, () => {
  console.log("Sever is running at port 3000");
});

let handler={};
handler.sample = (data, callback) => {
  callback(406, {'name': 'sample handle'})
};
handler.notFound = (data, callback) => {
  callback(404);
};
handler.home = (data, callback) => {
  callback(200, "home page");
};

let router = {
  'sample': handler.sample,
  'notFound': handler.notFound,
  'home': handler.home,  
}
