const dotenv = require("dotenv");
dotenv.config();
const app = require("./index")
const http = require("http");
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Port is listening on ${PORT}`);
});


