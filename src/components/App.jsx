import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import styles from './App.module.css';
import { addContact, deleteContact, setFilter, fetchContacts } from '../redux/reducers/contactsReducer';


const App = () => {
  const contacts = useSelector((state) => state.contacts.items || []);
  const filter = useSelector((state) => state.contacts.filter);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts()); // Fetch contacts on initial render
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    // Verifică dacă un contact cu același nume și număr există deja
    const contactExists = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase() || contact.number === number
    );
  
    if (contactExists) {
      alert('This contact already exists.');
      return; // Oprește adăugarea contactului
    }
  
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
    if (!Array.isArray(contacts)) {
      return [];
    }
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
      
      {isLoading && <p>Loading...</p>}
{error && <p>{error}</p>}
{!isLoading && !error && contacts.length > 0 && (
  <ContactList contacts={getFilteredContacts()} onDeleteContact={handleDeleteContact} />
)}
{!isLoading && !error && contacts.length === 0 && (
  <p>No contacts available.</p>
)}
    </div>
  );
};

export default App;