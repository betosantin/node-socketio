const { Socket } = require("dgram");
var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", (client) =>{
    client.on("disconnect", ()=>{
        console.log("Socket: " + client.id + " desconectou-se");
    });

    client.on("boasvindas", (data) =>{
        console.log(data);
    });

    client.on("palavra", (data) =>{
        console.log(data);

        client.emit("resultado", "Texto: " + data + ", recebido com sucesso.");
    });
});



app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
});

http.listen(3000, ()=>{
    console.log("App on!");
})