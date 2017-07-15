var http = require('http');
var url = require('url');
function start(route, handle) {
    function onRequest(request, response) {
        var urlstr = request.url;
        var query =url.parse(urlstr,true).query;
        var pathname = url.parse(urlstr).pathname;
        route(pathname, handle, response,request,query);

    }
    var server = http.createServer(onRequest);
    server.listen(8084);
}
exports.begin = start;