import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { TextField } from "@mui/material";
import { selectNameFilter } from "../../redux/filters/selectors";

import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchContact = useSelector(selectNameFilter);
  const filteredContacts = useSelector(selectFilteredContacts);

  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={css.searchWrapper}>
      <p className={css.heading}>Find contact by name:</p>
      <TextField
        sx={{
          width: 400,
          marginBottom: "15px",
        }}
        fullWidth
        InputLabelProps={{
          style: { color: "#FB9AD1" },
        }}
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
        type="text"
        label="Type contact's name..."
        title="Type contact's name"
        value={searchContact}
        onChange={handleChange}
      />
      {filteredContacts.map((contact) => (
        <div key={contact.id}></div>
      ))}
    </div>
  );
};

export default SearchBox;
