const express = require("express");
const cors = require('cors');
const server = express();
server.use(express.json());

server.use(cors());


const taskRoutes = require("./routes/taskroutes");
server.use('/task', taskRoutes);


server.listen(3000, () => {
    console.log("Servidor rodando!")
});