import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from 'react';
import FormFields from '../utils/formfields';
import {update,validform, generatedata} from '../utils/formtions'
import {connect} from 'react-redux'
import {forgetpass} from '../actions/memberactions'
import queryString from 'query-string';
import hexa from '../../images/hexa.png'



class Forgot extends Component {
    state={
        loading:false,
        formSuccess:false,
        formError:false,
        formdata:{
        password: {
            element:'input',
            value:'',
            config:{
                name:'password',
                placeholder:'Enter password here',
                type:'password'
            },
            validation:{
                required:true
            },
            valid:false,
            validationMessage:'',
            label:true
        },
        confirmpassword: {
            element:'input',
            value:'',
            config:{
                name:'Confirm Password',
                placeholder:'ReEnter your Password here',
                type:'password'
            },
            validation:{
                required:true,
                confirm: 'password'
            },
            valid:false,
            validationMessage:'',
            label:true
        }
}
    }

updateform=(element)=>{
    const newdata=update(element,this.state.formdata,'register')
    this.setState({
        formdata:newdata,
    })
}

submitform=(event)=>{
console.log('ggg')
event.preventDefault();
const isformvalid=validform(this.state.formdata,'register')
const data=generatedata(this.state.formdata,'register')
console.log(queryString.parse(this.props.location.search))
if(isformvalid){
    this.props.dispatch(forgetpass(queryString.parse(this.props.location.search),data)).then((response)=>{
        if(response.payload.success){
         
            this.setState({
                formSuccess:true,
                formError:false,
                loading:true
            })
            setTimeout(()=>{
            this.props.history.push('/login')
            console.log('dffdfd')
            },5000)}
            else{
                this.setState({
                    formError:true
                })
            }
        }
    )}
}

    render() {
        return (
            this.state.loading?
        <center> <CircularProgress thickness={7} size={10} style={{color:'grey'}} />  </center>
            :
            <div className="containers">
                <div className="headtitle row">
                    <h2 className="neon" style={{fontFamily:"sans serif"}}>RESET PASSWORD</h2>
                </div>
                <form id="contact" onSubmit={(event)=>{
                  this.submitform(event)
                }}>
            <div>
                <img src={hexa} id="image"/>
              <h3>CHEMICAL ENGINEERING STUDENTS SOCIETY</h3>
                <h4>National Institute of Technology Durgapur</h4>
                
              </div>
               
                <div className="block row">
                  <FormFields
                  formdata={this.state.formdata.password}
                  id={'password'}
                  change={(event)=>{this.updateform(event)}}
                />
                </div><br></br>

                <div className="block row">
                <FormFields
                  formdata={this.state.formdata.confirmpassword}
                  id={'confirmpassword'}
                  change={(event)=>{this.updateform(event)}}
                />
                </div>

                <br></br>
                
                <br></br>
                <br></br>
                <fieldset>
          <center>   
                <button class="btn btn-primary" style={{padding:"10px"}} onClick={(event)=> this.submitform(event)}>
                     Reset your Password
                </button></center> 
                </fieldset>
                </form>
                </div>
        );
    }
}

export default connect()(Forgot);