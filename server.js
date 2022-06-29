const http = require("http");
const port = 8080;

const routes = {
    '/': 'Crud Library',
    '/books': 'Book page',
    '/authors': 'Author list',
    '/about': 'Project information'
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(routes[req.url]);
})

server.listen(port, () => {
    console.log("Server is running");
})