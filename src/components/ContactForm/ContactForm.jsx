import { nanoid } from "nanoid";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { Toaster, toast } from "react-hot-toast";
import { TextField } from "@mui/material";

import css from "./ContactForm.module.css";

const ContactForm = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const INITIAL_FORM_DATA = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too short!")
      .max(30, "User name must be less than 30 characters!")
      .required("Name is required")
      .test("uniqueName", "Name already exists", (value) => {
        return !contacts.some((contact) => contact.name === value);
      }),
    number: Yup.string()
      .min(3, "Phonenumber must be at least 3 characters!")
      .required("Number is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmiting }) => {
    try {
      dispatch(addContact({ id: nanoid(), ...values }));
      toast.success("Contact added successfully");
      resetForm();
    } catch (error) {
      toast.error("Failed to add contact");
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={INITIAL_FORM_DATA}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.formWrapper}>
            <Field
              type="text"
              name="name"
              placeholder="John Smith"
              as={TextField}
              label="Name:"
              fullWidth
              InputLabelProps={{
                style: { color: "#FB9AD1" },
              }}
              InputProps={{
                style: { color: "#FFFFFF" },
              }}
            />
            <ErrorMessage name="name" component="span" />
            <Field
              type="text"
              name="number"
              placeholder="123-00-19"
              as={TextField}
              label="Number:"
              fullWidth
              InputLabelProps={{
                style: { color: "#FB9AD1" },
              }}
              InputProps={{
                style: { color: "#FFFFFF" },
              }}
            />
            <ErrorMessage name="number" component="span" />
            <button
              type="submit"
              disabled={isSubmitting}
              title="Click to save new phonenumber"
              aria-label="Add new phonenumber"
            >
              Add contact
            </button>
          </Form>
        )}
      </Formik>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ContactForm;
