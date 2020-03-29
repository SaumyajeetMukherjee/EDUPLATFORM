import React, { Component } from 'react';
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'
import io from 'socket.io-client'
import queryString from 'query-string'
import Live from './live';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {endsession} from '../actions/recordactions'

const socketUrl = "http://localhost:3002"
class ChatContainer extends Component {
	constructor(props){  
		super(props)
	this.state = {
		  chats:[],
		  activeChat:null,
		  socket:{},
		  roomname:'',
		  user:''
			 }
			 this.socket = io(socketUrl)
			 this.socket.on("activemessage",(message)=>{
			
			   console.log(message)
			   this.setActiveChat(message)
	       	   let	newchat=[...this.state.chats,message]
		    this.setState({
			   chats:newchat
	                	})
			  console.log(this.state.chat)
		      })
			}

	
	componentWillMount() {
		this.initSocket()		
		const values = queryString.parse(this.props.location.search)
		this.setState({
				  roomname:values.room,
		     	   name:values.name
					  })
		   	}
		
			initSocket = ()=>{
				const socket = io(socketUrl)
		
				socket.on('connect', ()=>{
					console.log("Connected");
				})
		
				this.setState({socket:socket})
		
			}
	componentDidMount() {
		const socket=this.socket
		console.log(this.state.roomname)
		socket.emit('subscribe',this.state.roomname)
     	setInterval(()=>{
			console.log(this.state.chats)		
            },5000)
	                  }
	
	sendMessage = ( message)=>{
		console.log(message,this.state.roomname,this.state.name)
		
		const roomname=this.state.roomname
		const name=this.state.name
		
		this.socket.emit("message", {roomname,name,message} )
		
	}

    
	setActiveChat = (activeChat)=>{
		this.setState({activeChat:activeChat})
	}

	endsession=(e)=>{
		e.preventDefault()
		const user=this.props.user.userData.name
		this.props.dispatch(endsession(this.state.roomname,this.props.user.userData.email)).then((res)=>{
           console.log(res)
		}).catch(e=>console.log(e))
	
	}

	render() {
		console.log(this.state.chats)
		const { user, logout } = this.props
		const { chats, activeChat } = this.state
		return (
			<div className="container">
					<Live socket={this.socket}/>
					<br></br><br></br><br></br>
					<div className="row">
				<div className="chat-room-container" style={{margin:"4px"}}>
					 
				<div className="row">           
							<div className="chat-room" style={{border:"2px solid black"}}>
			
								 {this.state.chats.length>0?
								   <Messages
									messages={this.state.chats}
									user={user}
									typingUsers={activeChat.typingUsers}
									/>
									:null
									}
									</div>
									</div>
									<br></br><br></br><br></br><br></br><br></br>
									<br></br><br></br>
									<div className="row">
								        <MessageInput sendMessage={this.sendMessage}/>
									</div>

							
					
				</div>
				</div>
				{this.props.user.userData.isAdmin?
				<button
				onClick={e=>this.endsession(e)}
						type = "submit"
						className = "send"
				>
					<Link to="/livechat">
							 END SESSION
					</Link>
				</button>:
				<button
				type = "submit"
				className = "send"
		>
			<Link to="/livechat">
					 GO BACK
			</Link>
		</button>
	}
			</div>
		);
	}
}
const mapStateToProps=(state)=>{
       
    return{
      user:state.member
    }
      
}

export default connect(mapStateToProps)(ChatContainer);

