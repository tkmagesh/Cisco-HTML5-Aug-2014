var nodeJsWebsocket= require("nodejs-websocket");

var server = nodeJsWebsocket.createServer(function(connection){
	console.log("A new connection is established...");
	connection.on("text", function(msg){
		console.log("Message from client - ", msg);
		/*if (msg === "time"){
			setInterval(function(){
				connection.sendText(new Date().toString());	
			},5000);
		}*/
		for(var i=0;i<server.connections.length;i++){
			server.connections[i].sendText(msg);
		}
	});
});
server.listen(9095);
console.log("Socket server listening on port 9095");