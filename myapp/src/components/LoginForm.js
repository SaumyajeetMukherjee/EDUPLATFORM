import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {writeuser} from './actions/recordactions'

class LoginForm extends Component {
	  
	state = {
	  	roomname:"",
		  error:"",
		  roomList:[]
	  }

	// setUser = ({room, isRoom})=>{

	// 	if(isRoom){
	// 		this.setState({error:"Room Name already taken"})
	// 	}else{
	// 		this.setState({error:""})
	// 	}
	// }


	handleSubmit = (e)=>{
		e.preventDefault()
		const roomname = this.state.roomname
		//socket.emit("verifyrooms", roomname, this.setUser)

		// if(this.state.error==''){
		const user=this.props.user.userData.name
		this.props.dispatch(writeuser(user,roomname)).then((res)=>{
           console.log(res)
		}).catch(e=>console.log(e))
	
		console.log(this.state.roomname)
		// socket.on('rooms',rooms=>{
		// 	console.log("ds")
	       		
		// 	this.setState({
		// 		roomList:rooms,
        //        creator:true
		// 	})
         
		// })
   
		setTimeout(()=>{
            this.props.history.push(`/chat?room=${this.state.roomname}&name=${this.props.user.userData.id}`)
            console.log('dffdfd')
            },5000)

	// }
}

	handleChange = (e)=>{
		this.setState({roomname:e.target.value})
	}


	// displayList=()=>(
         
	// 	this.state.roomList?
	// 	this.state.roomList.map((room,i)=>{
	// 		return (
	// 			<tr key={i}>
	// 			<th scope="row">{i+1}</th>
	// 		<td><Link to={`/chat?room=${this.state.roomname}&name=${this.props.user}`}>{room}</Link></td>
	// 		  </tr>
		   
	// 		)
	// 	}):
	// 	null
	// )

	render() {
		const { roomname, error } = this.state
		return (
		
			<div className="row">
				<form onSubmit={this.handleSubmit} className="login-form" >

					<label htmlFor="nickname">
						{
							this.props.user.userData.isAdmin?
							<h2>Create the room and give the name only to your students </h2>
							:
						<h2>Enter the room name given by your instructor</h2>
	                    }
					</label>
					<input
						ref={(input)=>{ this.textInput = input }}
						type="text"
						id="nickname"
						className="form-control"
						value={roomname}
						onChange={this.handleChange}
					
						/>

					<button
	                   disabled={!this.state.roomname>1}
						type = "submit"
						className = "btn btn-primary">
							 Send
					 </button>

				</form>
				</div>
		
		);
	}
}
const mapStateToProps=(state)=>{
    
	return{
		user:state.member,
		  }    
							  }


export default withRouter(connect(mapStateToProps)(LoginForm));
