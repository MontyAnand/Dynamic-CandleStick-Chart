const http = require("http");
const { Server } = require("socket.io");
const { Worker } = require('node:worker_threads');

const worker = new Worker('./worker.js');
const server = http.createServer();
const io = new Server(server,{
    cors: {
        origin: "*", // Allows all origins, or specify your domain
        methods: ["GET", "POST"]
    }
});

worker.on('error',(e)=>{
    console.log(`Error during simulation : ${e}`);
})

io.on('connection', async (socket)=>{
    console.log(`client connected : ${socket.id}`);
    worker.on('message', (data)=>{
        const obj = {
            timestamp: Date.now(),
            ohlcv : data
        }
        io.emit('getRawData',obj);
    })
});

server.listen(8000, ()=>{
    console.log("Server is running on port 8000");
});