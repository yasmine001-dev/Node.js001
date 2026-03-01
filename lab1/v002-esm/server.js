import http from 'node:http';
import routes from './routes.js'; 
const server = http.createServer(routes);

server.listen(3000, () => {
  console.log("Server is listening at http://localhost:3000");
});