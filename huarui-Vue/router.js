var staticProvider = require('./staticProvider')

function route(pathname, handle, response,request,query) {

    if (typeof handle[pathname] === "function") {
        return handle[pathname](response,query);
    } else {
        if (staticProvider.staticPathExists(request)) {
            staticProvider.staticProvieder(request, response);
        }
        else {
            response.writeHead(404, { "Content-type": "text/plain" });
            response.write('404 NOT FOUND');
            response.end();
        }


    }
}
exports.route = route;