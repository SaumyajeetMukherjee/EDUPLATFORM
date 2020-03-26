import React, { Component } from 'react';
import {connect} from 'react-redux'
import {update,validform, generatedata} from '../utils/formtions'
import {addaward}  from '../actions/recordactions'
import FormFields from '../utils/formfields';
import FileUpload from '../utils/fileupload'
class Addnews extends Component {

    state={ 
        formSuccess:false,
        formError:false,
        formdata:{
        name: {
            element:'input',
            value:'',
            config:{
                name:'NAME',
                placeholder:'Enter the name of the award here',
                type:'text'
            },
            validation:{
                required:false
            },
            valid:true,
            validationMessage:'',
            label:true
        },
        subject: {
            element:'input',
            value:'',
            config:{
                name:'SUBJECT',
                placeholder:'Type the subject',
                type:'text'
            },
            validation:{
                required:false
            },
            valid:true,
            validationMessage:'',
            label:true
        },
        // year: {
        //     element:'input',
        //     value:'',
        //     config:{
        //         name:'DATE',
        //         placeholder:'Enter the date of event',
        //         type:'text'
        //     },
        //     validation:{
        //         required:false
        //     },
        //     valid:true,
        //     validationMessage:'',
        //     label:true
        // },
        images:{
            value:[],
            validation:{
                required:false
            },
            valid: false,
            touched: false,
            validationMessage:'',
            label:false
        }
    }
}

updateform=(element)=>{
    const newdata=update(element,this.state.formdata,'register')
    this.setState({
        formdata:newdata,
    })

}

imageHandler=(images)=>{
    console.log(images)
    const newFormData={
        ...this.state.formdata
    }
      newFormData['images'].value=images;
      newFormData['images'].valid=true
      this.setState({
          formData:newFormData
      })

      console.log(this.state.formdata.images)
}


submitform=(event)=>{
    event.preventDefault();
    const isformvalid=validform(this.state.formdata,'register')
    console.log(isformvalid)
    const data=generatedata(this.state.formdata,'register')
    console.log(this.props.user.member)
    if(true){
        this.props.dispatch(addaward(data)).then((response)=>{
            if(response.payload.success){
             console.log('hurray')
                this.setState({
                    formSuccess:true,
                    formError:false
                })
            }
                else{
                    this.setState({
                        formError:true
                    })
                }
            }
        )}
    }

    render() {
        console.log(this.props)
        return (
            <div className="container">
            <div className='add'>
                <div className="row">
                <div className="headtitle">
                    <h2 className="neon" style={{fontFamily:"sans serif"}}>ADD AWARD</h2>
                </div>
                <div className="each">
              <FileUpload
                    imageHandler={(images)=>this.imageHandler(images)}
                    reset={this.state.formSuccess}/>
              </div>
            <br></br><br></br><br></br>
                </div><br></br><br></br>
            <div className="jumbotron">

            <div className="row">
             <div className="each">
               <FormFields
                  formdata={this.state.formdata.name}
                  id={'name'}
                  change={(event)=>{this.updateform(event)}}
                />
            </div>
            </div>

            <div className="row">
            <div className="each">
               <FormFields
                  formdata={this.state.formdata.subject}
                  id={'subject'}
                  change={(event)=>{this.updateform(event)}}
                />
            </div>
            </div>
            
          
            <div className="block row">
          <center>   
            <button style={{padding:"10px"}} onClick={(event)=> this.submitform(event)}>
                SUBMIT THIS INFORMATION
             </button>
                </center>
                 </div>
            </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    
       
    return{
      user:state.member,
    }
      
}

export default connect(mapStateToProps)(Addnews);