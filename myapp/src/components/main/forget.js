import React, { Component } from 'react';
import FormFields from '../utils/formfields';
import {update,validform, generatedata} from '../utils/formtions'
import {connect} from 'react-redux'
import {forget} from '../actions/memberactions'
import hexa from '../../images/hexa.png'

class Forget extends Component {
    state={
        loading:false,
        data:'',
        formSuccess:false,
        formError:false,
        formdata:{
   email: {
            element:'input',
            value:'',
            config:{
                name:'email',
                placeholder:'Enter email here',
                type:'email'
            },
            validation:{
                required:true
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
    console.log("Dfdf")
event.preventDefault();
const isformvalid=validform(this.state.formdata,'register')
const data=generatedata(this.state.formdata,'register')
console.log(data)
console.log(isformvalid)
if(isformvalid){
    console.log("lll")
    this.setState({
        data:data,
        loading:true
    })
    this.props.dispatch(forget(data)).then((response)=>{
   
        console.log(response)
            }).catch(err=>console.log(err))

        }
    
}

    render() {
        return (
            this.state.loading?
        <center> <h2>Email sent to <u>{this.state.data.email}</u></h2> </center>
            :
            <div className="containers">
                     
                     <div className="headtitle row">
                    <h2 className="neon" style={{fontFamily:"sans serif"}}>RESET PASSWORD</h2>
                </div>
                <form id="contact" onSubmit={(event)=>{
                  this.submitform(event)
                }}>
                      
 
                        <div><img src={hexa} id="image"/>
              <h3>CHEMICAL ENGINEERING STUDENTS SOCIETY</h3>
                <h4>National Institute of Technology Durgapur</h4>
                
              </div>
                <div className="block row">
                  <FormFields
                  formdata={this.state.formdata.email}
                  id={'email'}
                  change={(event)=>{this.updateform(event)}}
                />
                </div>
                <br></br>

                <br></br>
                <br></br>
                <fieldset>
          <center>     
                <button id="contact-submit" style={{padding:"10px"}} onClick={(event)=> this.submitform(event)}>
                     Reset your Password
                </button>
          </center>
                </fieldset>
                </form>
                </div>
        );
    }
}

export default connect()(Forget);