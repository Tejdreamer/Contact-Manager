import React ,{useRef} from "react"
import ContactCard from "./ContactCard";

import  {useHistory } from "react-router-dom";


const ContactList =(props) =>{
   const inputEl=useRef("")
    const history = useHistory();

    const handleButtonClick = () => {
        // Navigate to a specific route on button click
        history.push('/add'); // Example: Navigate to '/add' route
    };

    const deleteContactHandler= (id) =>{
        props.getContactId(id);
    }
       
        const renderContactList = props.contacts.map((contact) => {
            return (

                
                <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id} ></ContactCard>
               
            )
        })

        const getSearchTerm = () =>{
            props.searchKeyword(inputEl.current.value)
        };
    
    return (
        <div className="ui celled list" style={{marginTop:"calc(7%)"}}>
            <div style={{display:"flex", marginBottom:"3px"}}>
            <h2>Contact List </h2>
            <button className="ui button blue right"  style={{marginLeft:"calc(72%)"}} onClick={handleButtonClick}>Add Contact</button>
            </div >
            <div className="ui search" >
                <div className="ui icon input" style={{width:"100%"}}>
                    <input ref={inputEl} type="text" place="search Contacts" className="prompt" value={props.term} onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>
            </div>
            {renderContactList.length>0 ?renderContactList:"No contacts available"}
        </div>
    )
};


export default ContactList