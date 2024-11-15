// src/components/ContactForm/ContactForm.jsx
import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from './App.module.css';

const ContactForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (name.trim() === '' || number.trim() === '') {
        alert('Please fill in both fields.');
        return;
      }
      onSubmit(name, number);
      setName('');
      setNumber('');
    };
  
    return (
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            name="name"
            id="nameInput"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          
          <label htmlFor="numberInput">Number</label>
          <input
            type="tel"
            name="number"
            id="numberInput"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={styles.input}
          />
          
          <button type="submit" className={styles.button}>Add contact</button>
        </form>
      </div>
    );
  };
  
  ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  
  export default ContactForm;