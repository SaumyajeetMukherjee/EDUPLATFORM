import React from 'react';
import Card from './card';
const Gen = (props) => {
    const generatecards=()=>(       
      props.recalumni?
             props.recalumni.map((item,i)=>(
                <div className="row">
                 <div className=" gen" style={{padding: "20px",}}>
                 <div className="row">
                 <Card
                 key={i}
                 name={item.name}
                 workplace={item.workplace}
                  year={item.year}
                  email={item.email}
                  evaction={props.change}
                  additional={item.additional}
                  degree={item.currentdegree}
                  images={item.images}
                 />
                 </div>
             </div>
             <br></br>
             </div>
            
             )):null
        )
    return (
        <div>
            {generatecards()}
        </div>
    );
};

export default Gen;