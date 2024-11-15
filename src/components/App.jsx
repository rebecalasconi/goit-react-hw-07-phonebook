// src/App.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import styles from './App.module.css';
import { addContact, deleteContact, setFilter } from '../redux/reducers/contactsReducer'

const App = () => {
  // Modificat: Adăugat fallbackuri pentru a preveni erori
  const contacts = useSelector((state) => state.contacts?.contacts || []);
  const filter = useSelector((state) => state.contacts?.filter || "");
  const dispatch = useDispatch();

  const handleAddContact = (name, number) => {
    const newContact = { id: nanoid(), name, number };
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={getFilteredContacts()} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;