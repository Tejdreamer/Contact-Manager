import React from 'react';
import user from "../images/user.png"
import { Link } from 'react-router-dom';
import pngegg from "../images/pngegg.png"
const ContactDetail = (props) =>{
    // console.log(props)
    const {name,email}=props.location.state.contact
   return (
    <div>
    <div className="ui card centered" style={{marginTop:"calc(6%)"}}>
        <div className="image">
              <img src={pngegg} alt="pngegg"/>
         </div>

         <div className="content">
                       
                       <div className="header">
                            {name}
                        </div >
                        <div className="description">{email}</div>
                       
        </div>
        
    </div>

    <div className="center-div" style={{marginLeft:"calc(41%)"}}>
         <Link to="/"><button className="ui button blue center"> Back to ContactList</button></Link>
         </div>
    </div>
     
   )  
};

export default ContactDetail