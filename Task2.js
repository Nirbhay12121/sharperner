const http = require('http');
const url = require('url'); 

const server = http.createServer((req, res) => {
    
    const fullUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = fullUrl.pathname;

    res.setHeader('Content-Type', 'text/html');

    if (pathname === '/home') {
        res.write('<h1>Welcome home</h1>');
    } else if (pathname === '/about') {
        res.write('<h1>Welcome to About Us</h1>');
    } else if (pathname === '/node') {
        res.write('<h1>Welcome to my Node Js project</h1>');
    } else {
        res.write('<h1>Page Not Found</h1>');
    }
    
    res.end();
});

server.listen(3000);