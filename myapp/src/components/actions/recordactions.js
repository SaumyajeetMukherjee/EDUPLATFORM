import axios from 'axios';
import {
    WRITEUSER,
    ADDDETAIL,
    ADDRECORD,
    ALLAWARDS,
    ALLALUM,
    ADDAWARD,
    SEARCHYR,
    GETRECORD,
    ENDSESSION,
    ADDEDUCATION
} from './types';

import { RECORD_SERVER } from '../utils/misc';


export function adddetails(data){
    const request = axios.post(`${RECORD_SERVER}/adddetail`,data)
        .then(response => response.data);
    
    return {
        type: ADDDETAIL,
        payload: request
    }
}

export function addaward(data){
    const request = axios.post(`${RECORD_SERVER}/addaward`,data)
        .then(response => response.data);
    
    return {
        type: ADDAWARD,
        payload: request
    }
}




export function allalum(){
    const request = axios.get(`${RECORD_SERVER}/allalum`)
        .then(response => response.data);
    
    return {
        type: ALLALUM,
        payload: request
    }
}

export function allawards(){
    const request = axios.get(`${RECORD_SERVER}/allawards`)
        .then(response => response.data);
    
    return {
        type: ALLAWARDS,
        payload: request
    }
}


export function getrecords(){
    const request = axios.get(`${RECORD_SERVER}/getrecords`)
        .then(response => response.data);
    
    return {
        type: GETRECORD,
        payload: request
    }
}



export function searchyear(data){
    console.log(data)
    const request = axios.post(`${RECORD_SERVER}/searchyr`,data)
        .then(response => response.data);
    return {
        type:SEARCHYR,
        payload: request
    }
}



export function writeuser(user,roomname){
    const data={
        roomname,
        user
    }
    console.log(data)
    const request = axios.post(`${RECORD_SERVER}/writeuser`,data)
        .then(response => response.data);
    return {
        type:WRITEUSER,
        payload: request
    }
}


export function addrecord(data,email){
    console.log(data)
    const request = axios.post(`${RECORD_SERVER}/records`,data)
        .then(response => response.data);
    
    return {
        type: ADDRECORD,
        payload: request
    }
}

export function endsession(room,email){
    const data={
        room,email
    }
    console.log(data)
    const request = axios.post(`${RECORD_SERVER}/endsession`,data)
        .then(response => response.data);
    
    return {
        type: ENDSESSION,
        payload: request
    }
}


export function addeducation(data,email){
    console.log(data)
    const request = axios.post(`${RECORD_SERVER}/education`,data)
        .then(response => response.data);
    
    return {
        type: ADDEDUCATION,
        payload: request
    }
}