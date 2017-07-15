let http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    zlib = require("zlib");
let mime_type = {
    "txt": "text/plain",
    "xml": "text/xml",
    "html": "text/html",
    "css": "text/css",
    "js": "text/javascript",
    "json": "application/json",
    "gif": "image/gif",
    "png": "image/png",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "svg": "image/svg+xml",
    "ico": "image/x-icon",
    "pdf": "application/pdf",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv"
};
let staticPath = "./static/";

function staticPathExists(request) {
    let pathName = url.parse(request.url).pathname || "",
        realPath = path.join(staticPath, path.normalize(pathName.replace(/\.\./g, "")));; // 请求文件的在磁盘中的真实地址
    let file_exists = fs.existsSync(realPath);
    return file_exists;
}
let Expires = {
    fileMatch: /^(gif|png|jpg|js|css)$/ig,
    maxAge: 60 * 60 * 24 * 365
};
function handleStaticPath(request, response) {
    let pathName = url.parse(request.url).pathname || "",
        realPath = path.join(staticPath, path.normalize(pathName.replace(/\.\./g, "")));; // 请求文件的在磁盘中的真实地址
    fs.exists(realPath, (exists) => {
        if (!exists) {
            return exists;
        } else {
            // 当文件存在时
            fs.readFile(realPath, "binary", (err, file) => {
                if (err) {
                    // 文件读取出错
                    response.writeHead(500, { "Content-Type": "text/plain" });
                    response.end(err);
                } else {
                    // 当文件可被读取时，输出文本流
                    let extName = path.extname(realPath);
                    extName = extName ? extName.slice(1) : "";
                    let contentType = mime_type[extName] || "text/plain";
                    let raw = fs.createReadStream(realPath);
                    response.writeHead(200, { "Content-Type": contentType });
                    raw.pipe(response);
                }
            });
            return exists;
        }
    });
}
exports.staticProvieder = handleStaticPath;
exports.staticPathExists = staticPathExists;