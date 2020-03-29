const io = require('./server.js').io
let availableRooms=[]
let connectedPeers = new Map()


module.exports = function(socket){

	console.log("Socket Id: " + socket.id);

	let sendMessageToChatFromUser;
	let sendTypingFromUser;

	// //Verify Username
	// socket.on(VERIFY_USER, (nickname, callback)=>{
	// 	if(isUser(connectedUsers, nickname)){
	// 		callback({ isUser:true, user:null })
	// 	}else{
	// 		callback({ isUser:false, user:createUser({name:nickname, socketId:socket.id})})
	// 	}
	// })  

	// socket.on('adduser',(user)=>{
	// socket.user=user	
	// })

	// })
	roomList()

	socket.on('verifyrooms', (roomname, callback)=>{
		console.log('ddjjj')
		
		if(isUser(availableRooms, roomname)){
			console.log(availableRooms,roomname)
			callback({ isRoom:true, user:null })
		}else{
			callback({ isRoom:false, room:{room:roomname}})
		}
	})

      socket.on('error',function(err){
       console.log(err)
	  })
	//User disconnects
	// socket.on('disconnect', ()=>{
	// 	// if("user" in socket){
	// 	// 	connectedUsers = removeUser(connectedUsers, socket.user.name)

	// 	// 	io.emit(USER_DISCONNECTED, connectedUsers)
	// 		console.log("Disconnect");
	// 	// }
	// })

	socket.emit('connection-success', { success: socket.id })

	connectedPeers.set(socket.id, socket)
  
	socket.on('disconnect', () => {
	  console.log('disconnected')
	  connectedPeers.delete(socket.id)
	})
  
	socket.on('offerOrAnswer', (data) => {
	  for (const [socketID, socket] of connectedPeers.entries()) {
		if (socketID !== data.socketID) {
		  console.log(socketID, data.payload.type)
		  socket.emit('offerOrAnswer', data.payload)
		}
	  }
	})
  
	socket.on('candidate', (data) => {
	  for (const [socketID, socket] of connectedPeers.entries()) {
		if (socketID !== data.socketID) {
		  console.log(socketID, data.payload)
		  socket.emit('candidate', data.payload)
		}
	  }
	})

   socket.on('joinroom',(roomname)=>{
	   console.log("JOINED")
	   socket.join(roomname)
	   
   })
   socket.on('subscribe', function(data) { socket.join(data); })

	socket.on("message",({roomname,user,message})=>{
		const mess={
				
				message

		}
		console.log(roomname,user)
		// console.log(io.sockets.clients(roomname))
	
		io.of('/').to(roomname).emit("activemessage",{message})


		console.log(getAllRoomMembers(roomname))
		console.log(mess)
	})


	function getAllRoomMembers(room, _nsp) {
		var roomMembers = [];
		var nsp = (typeof _nsp !== 'string') ? '/' : _nsp;
	
		for( var member in io.nsps[nsp].adapter.rooms[room] ) {
			roomMembers.push(member);
		}
	
		return roomMembers;
	}
	
}


function findRooms() {
	var rooms = io.sockets.adapter.rooms;
     availableRooms=[]
    if (rooms) {
        for (var room in rooms) {
            if (!rooms[room].hasOwnProperty(room)) {
				console.log(room)
                availableRooms.push(room);
            }
        }
    }
    return availableRooms;
}

function roomList(){
	let rooms=findRooms()
	console.log(rooms)
	io.emit('rooms',rooms)
}

function isUser(userList, username){
  	return username in userList
}
