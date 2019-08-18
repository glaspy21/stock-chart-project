const express = require('express');
const http = require(`http`);
const bodyParser = require(`body-parser`);
const PORT = 8000;



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})
