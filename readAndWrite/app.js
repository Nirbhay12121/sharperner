const http = require('http');

const routes = require('./routes');

module.exports = {
    handler: routes,
    someText: 'Some hard coded text'
}
const server = http.createServer(routes.handler); 

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});