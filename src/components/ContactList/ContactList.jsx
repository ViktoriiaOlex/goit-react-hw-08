import React from "react";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

import css from "./ContactList.module.css";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div className={css.contactWrapper}>
      {filteredContacts.map((contact) => (
        <Contact contact={contact} key={contact.id} />
      ))}
    </div>
  );
};

export default ContactList;
