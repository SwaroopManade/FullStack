import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import ContactList from './Components/Contacts/ContactList/ContactList'
import ViewContact from './Components/Contacts/ViewContact/ViewContact'
import EditContact from './Components/Contacts/EditContact/EditContact'
import AddContact from './Components/Contacts/AddContact/AddContact'
import DeleteContact from './Components/Contacts/DeleteContact/DeleteContact'

const App = () => {
  return (
    <>
        <NavBar/>
        <Routes>
            <Route path='/' element={<Navigate to={'/contacts/list'}/>}/>
            <Route path='/contacts/list' element={<ContactList/>}/>
            <Route path='/contacts/add' element={<AddContact/>}/>
            <Route path='/contacts/edit/:id' element={<EditContact/>}/>
            <Route path='/contacts/view/:id' element={<ViewContact/>}/>
            <Route path="/contacts/delete/:id" element={<DeleteContact />} />

        </Routes>
    </>
  )
}

export default App
