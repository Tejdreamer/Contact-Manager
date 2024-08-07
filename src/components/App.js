import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';
import api from "../api/contacts"
function App() {
    const LOCAL_STORAGE_KEY = 'contacts';
    const [contacts, setContacts] = useState([]);
    const [searchTerm,setSearchTerm]=useState("")
    const [searchResults,setSearchResults]=useState([])


    // retrieve contacts

    const retrieveContacts=async ()=>{
        const response = await api.get("/contacts");
        return response.data;

    }

    const searchHandler =(searchTerm) =>{
        setSearchTerm(searchTerm)

        if(searchTerm!="")
            {
                const newContactList= contacts.filter((contact)=>{
                  return  Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
                })

                setSearchResults(newContactList);
            }
            else{
                setSearchResults(contacts)
            }

    };
    const addContactHandler = async (contact) => {
        console.log(contact);
        const request ={
            id:uuidv4(),
            ...contact,
        }

        const response=await api.post("/contacts",request);
        setContacts([...contacts, response.data]);
    };
     
    const updateContactHandler = async (contact) =>{
        const response = await api.put(`/contacts/${contact.id}`,contact)
        const {id,name,email}= response.data
        setContacts(contacts.map(contact=>{
                return contact.id===id ?{...response.data} : contact
        }))

    };
    const removeContactHandler = async(id) => {
        await api.delete(`/contacts/${id}`)
        const newContactList = contacts.filter((contact) => {
            return contact.id !== id;
        });
        setContacts(newContactList);
    };

    useEffect(() => {
        // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        // if (retrieveContacts) {
        //     setContacts(retrieveContacts);
        // }

        const getAllContacts=async()=>{
            const allContacts=await retrieveContacts();
            if(allContacts)
                {
                    setContacts(allContacts)
                }

            }
    getAllContacts()
        
    }, []);

    useEffect(() => {
        // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }, [contacts]);
  
   
    return (
        <div className="ui container">
            <Router>
                <Header/>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={(props) => (
                            <ContactList
                                {...props}
                                contacts={searchTerm.length<1 ? contacts:searchResults}
                                getContactId={removeContactHandler}
                                term={searchTerm}
                                searchKeyword={searchHandler}
                               
                            />
                        )}
                    />
                    <Route
                        path="/add"
                        render={(props) => (
                            <AddContact {...props} addContactHandler={addContactHandler} />
                        )}
                    />
                    <Route
                    path="/contact/:id" component={ContactDetail}
                    />

                     <Route
                        path="/edit"
                        render={(props) => (
                            <EditContact {...props} updateContactHandler={updateContactHandler} />
                        )}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
