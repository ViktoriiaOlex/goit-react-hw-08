import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import { Toaster, toast } from "react-hot-toast";
import { Button, TextField } from "@mui/material";

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch(() => {
        toast.error(
          "Failed to log in. Please check your credentials and try again."
        );
      });
  };

  return (
    <>
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <Field name="email">
            {({ field, meta }) => (
              <div>
                <TextField
                  {...field}
                  type="email"
                  label="Email"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#212121" },
                  }}
                  InputProps={{
                    style: { color: "#212121" },
                  }}
                />
                {meta.touched && meta.error && (
                  <div className={css.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="password">
            {({ field, meta }) => (
              <div>
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#212121" },
                  }}
                  InputProps={{
                    style: { color: "#212121" },
                  }}
                />
                {meta.touched && meta.error && (
                  <div className={css.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "15px" }}
          >
            Log In
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
