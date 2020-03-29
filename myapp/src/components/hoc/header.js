import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {log} from "../actions/memberactions"
import logo from '../../images/logo.png'
import {Container, Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import Toolbar from '../Navigation/Toolbar';


class Header extends Component {
  

  
   logoutuser=()=>{
       this.props.dispatch(log()).then(res=>{
           console.log('logout')
           
        }).catch(err=>
        console.log(err)
        )
   }
   
    render() {
      console.log(this.props.user.userData)
        return (
          // <Toolbar 
          //   isPass={this.props.user.userData}
          //   logout={this.logoutuser}
          //   />  


          

             <div className='header'>
               {/* <div className="containerl">
               <img className="limg" src={logo} alt="eduplat" />
             <div className="heading1">EduStream</div>
             <div className="heading2">Online Student Kit</div>
             </div>
               */}




             <nav className="navbar navbar_head navbar-expand-md bg-light ">
              <a className="navbar-brand " href="/"><img className="nav_brand" src={logo}/></a>
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav mr-auto">
                  
            
              </ul>
              <ul className="navbar-nav">
              <li className="nav-item">
                  <Link className ="nav-link"  style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/">HOME</Link>
                  </li>
                  <li className="nav-item">
                  <Link className ="nav-link" style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/facad">FACULTY</Link>
                  </li>
                  <li className="nav-item">
                  <Link className ="nav-link" style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/member">MEMBER</Link>
                  </li>
                  <li className="nav-item">
                  <Link className ="nav-link" style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/subject">SYLLABUS</Link>
                  </li>
 
                   {
                     this.props.user.userData?
                     this.props.user.userData.isAuth?
                    this.props.user.userData.role===1?
                    <li className="nav-item">
                    <Link className ="nav-link" style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/details" >ADD ACADEMIC DETAILS</Link>
                    </li>
                    :
                    <li className="nav-item">
                    <Link className ="nav-link" style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/allalum" >VIEW ALL ALUMNI</Link>
                    </li>
                    :null
                    :null
                   }
                   {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}

                   
{
                     this.props.user.userData?
                     this.props.user.userData.isAuth?
                    this.props.user.userData.role===1?
                   
                    <li className="nav-item">
                    <Link className ="nav-link" style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/allalum" >VIEW ALL ALUMNI</Link>
                    </li>
                    :null
                    :null
                    :null
                   }

                   
             {
                     this.props.user.userData?
                     this.props.user.userData.isAuth?
                    this.props.user.userData.role===1?
                   
                    <li className="nav-item">
                    <Link className ="nav-link" style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/addnews" >ADD NEWS</Link>
                    </li>
                    :null
                    :null
                    :null
                   }
                  
    
                  
                
                  {
                    !this.props.user.userData?
                  <li className="nav-item">
                  <Link className ="nav-link" style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/login" >LOGIN</Link>
                  </li>:null
                  }
                  
              <li className="nav-item">
                  <Link className ="nav-link " style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/register">REGISTER</Link>    
                  </li>
                  {this.props.user.userData?
                  
                    !this.props.user.userData.isAuth?
                    <li className="nav-item">
                    <Link className ="nav-link"  style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/login">LOGIN</Link>
                    </li>
                    :
                    <li className="nav-item">
                    <Link className ="nav-link " style={{fontFamily:"Times new roman",fontSize:"15px"}} to="/logout" onClick={(event)=>this.logoutuser()}>LOGOUT</Link>
                    </li>:null
    }
              </ul>
             </div>  
            </nav>
            <br></br>
            </div>
                        
        );
    }
}

const mapStateToProps=(state)=>{
    return{
      user:state.member,
    }
      
}

export default connect(mapStateToProps)(Header);