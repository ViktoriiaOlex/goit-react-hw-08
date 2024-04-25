import { IoPersonSharp } from "react-icons/io5";
import { BsTelephonePlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import { Button, TextField } from "@mui/material";

import css from "./Contact.module.css";

const Contact = ({ contact }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedContact, setEditedContact] = useState({ ...contact });
  const dispatch = useDispatch;

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteContact(contact.id));
    toast.success("Contact was deleted successfully");
    setIsDeleteModalOpen(false);
  };

  const handleSave = () => {
    dispatch(editContact(editContact));
    setIsEditModalOpen(false);
  };
  useEffect(() => {
    setEditedContact({ ...contact });
  }, []);

  return (
    <div className={css.contactBox}>
      <div>
        <p className={css.text}>
          <IoPersonSharp className={css.icon} />
          {editedContact.name}
        </p>
        <p className={css.text}>
          <BsTelephonePlusFill className={css.icon} />
          {editedContact.number}
        </p>
      </div>

      <Button type="button" onClick={openEditModal} variant="contained">
        Edit
      </Button>
      <Modal
        className={css.customModal}
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <h2>Edit Contact</h2>
        <form>
          <TextField
            sx={{
              width: 200,
              marginBottom: "15px",
            }}
            label="Name:"
            type="text"
            value={editedContact.name}
            onChange={(e) =>
              setEditedContact({ ...editedContact, name: e.target.value })
            }
          />

          <TextField
            sx={{
              width: 200,
              marginBottom: "15px",
              display: "flex",
              gap: "5px",
            }}
            label="Number:"
            type="text"
            value={editedContact.number}
            onChange={(e) =>
              setEditedContact({ ...editedContact, number: e.target.value })
            }
          />
        </form>
        <div className={css.btnWrapper}>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      </Modal>

      <Modal
        className={css.customModal}
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <h2 className={css.headingDelete}>Delete this contact?</h2>
        <p className={css.textDelete}>
          Are you sure you want to delete this contact?
        </p>
        <div className={css.btnWrapper}>
          <button onClick={confirmDelete}>Confirm</button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
