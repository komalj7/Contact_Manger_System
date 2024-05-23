import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ContactList } from './Components/Contacts/ContactList/ContactList';
import { AddContact } from './Components/Contacts/AddContact/AddContact';
import { EditContact } from './Components/Contacts/EditContact/EditContact';
import { NavBar } from './Components/NavCompo/NavBar';
import { ViewContact } from './Components/Contacts/ViewContact/ViewContact';
function App() {
  return (
  <div className="App">
      <NavBar/>
      <React.Fragment>
          <Routes>
              <Route path='/' element={<Navigate to={'contacts/list'}/>}/>
              <Route path='/contacts/list' element={<ContactList/>}/>
              <Route path='/contacts/add' element={<AddContact/>}/>
              <Route path='/contacts/edit/:contactID' element={<EditContact/>}/>
              <Route path='/contacts/view/:contactID' element={<ViewContact/>}/>
          </Routes>
      </React.Fragment>
      {/* me margin end */}
     {/* <button className='btn btn-primary'><i className='fa fa-home me-2'></i>HOME</button> 
      <br/>
      <br/>
      <button className='btn btn-danger'><i className='fa fa-close me-2'></i>CLOSE</button> 
      <br/>
      <br/>
      <button className='btn btn-secondary'><i className='fa fa-eye me-2'></i>VIEW</button> 
      <br/>
      <br/>
      <button className='btn btn-dark my-2'><i className='fa fa-plus me-2'></i>ADD</button> 
      <br/> */}
    </div>
  );
}

export default App;
