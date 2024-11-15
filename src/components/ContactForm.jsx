import React, { useState } from 'react';
import styles from './App.module.css'; // Importă stilurile

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (e) => {
    const value = e.target.value;
    // Permite doar caractere care nu sunt cifre
    if (!/\d/.test(value)) {
      setName(value);
    }
  };

  // Funcție pentru a preveni introducerea de caractere non-numerice
  const handleNumberInput = (e) => {
    const value = e.target.value;
    // Permite doar caractere numerice și caracterele pentru "+" și "-" și paranteze
    const validValue = value.replace(/[^0-9+()-]/g, ''); // Permite numere și semnele de telefon
    setNumber(validValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && number) {
      onSubmit(name, number);
      setName('');
      setNumber('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Name:
        <input 
          type="text" 
          value={name} 
          onChange={handleNameChange} // Verifică dacă este o cifră
          className={styles.input}
          required 
        />
      </label>
      <label className={styles.label}>
        Number:
        <input
          type="text"
          value={number}
          onInput={handleNumberInput} // Validare pentru număr
          className={styles.input}
          required
        />
      </label>
      <button type="submit" className={styles.button}>Add Contact</button>
    </form>
  );
};

export default ContactForm;