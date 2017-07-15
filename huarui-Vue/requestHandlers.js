var rf = require("fs");
var pug = require('pug');
var data = require('./data.js')
console.log(data)
function index(response, query) {
    var cf = pug.compileFile('./static/templates/index.pug');
    var content = cf({
        "name": "杜马"
    });
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.write(content);
    response.end();
}
function notice(response, query) {
    // console.log(query)
    var notice = pug.compileFile('./static/templates/notice.pug');
    console.log(data.getDataWithPage(query.page))
    var shownotice = notice(
        data.getDataWithPage(query.page)
    )
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
    response.write(shownotice);
    response.end();
}
function lows(response,query){
    var lows=pug.compileFile('./static/templates/lows.pug');
    var showlows=lows(
        data.lows_getDataWithPage(query.page)
    );
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
    response.write(showlows);
    response.end();
}
function start(response, query) {
    rf.readFile('./static/htmls/index.html', "utf-8", function (err, data) {
        if (err) {
            response.writeHead(404, { "Content-Type": "text/plain" })
            response.write("404 NOT FOUND");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data);
            response.end();
        }
    })
}
function getjson(response, query) {
    rf.readFile('./static/json/data.json', "utf-8", function (err, data) {
        if (err) {
            response.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" })
            response.write("404 NOT FOUND");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
            response.write(data);
            response.end();
        }
    });
}
exports.getjson = getjson;
exports.start = start;
exports.index = index;
exports.notice = notice;
exports.lows=lows;