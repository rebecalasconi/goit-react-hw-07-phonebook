// src/components/ContactList/ContactList.jsx
import React from "react";
import PropTypes from 'prop-types';
import ContactItem from "./ContactItem";

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map((contact) => (
      <ContactItem
        key={contact.id}
        name={contact.name}
        number={contact.number}
        onDelete={() => onDeleteContact(contact.id)}
      />
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;