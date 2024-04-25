import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";

import { register } from "../../redux/auth/operations";
import { Button, TextField } from "@mui/material";

import css from "./RegistrationForm.module.css";
import { Password } from "@mui/icons-material";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        resetForm();
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters long";
        }
        return errors;
      }}
    >
      <Form className={css.form} autoComplete="off">
        <div>
          <Field name="name">
            {({ field, meta }) => (
              <div>
                <TextField
                  {...field}
                  label="Username"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#FB9AD1" },
                  }}
                  InputProps={{
                    style: { color: "#FFFFFF" },
                  }}
                />
                {meta.touched && meta.error && (
                  <div className={css.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        </div>
        <div>
          <Field name="email">
            {({ field, meta }) => (
              <div>
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#FB9AD1" },
                  }}
                  InputProps={{
                    style: { color: "#FFFFFF" },
                  }}
                />
                {meta.touched && meta.error && (
                  <div className={css.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        </div>
        <div>
          <Field name="password">
            {({ field, meta }) => (
              <div>
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#FB9AD1" },
                  }}
                  InputProps={{
                    style: { color: "#FFFFFF" },
                  }}
                />
                {meta.touched && meta.error && (
                  <div className={css.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "15px" }}
          >
            Register
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
