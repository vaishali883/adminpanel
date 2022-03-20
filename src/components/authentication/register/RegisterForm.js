import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SnackbarModule from "../../../pages/sanckbar";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const handleSnackbarClose = () => {
    setOpen(false);
    // window.location.reload();
  };

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("User name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      user_name: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate("/dashboard", { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const save = () => {
    console.log(formik.values);
    const data = {
      user_name: formik.values.user_name,
      password: formik.values.password,
      Email: formik.values.email,
    };
    axios
      .post("http://localhost:4000/adminUser/ ", data)
      .then((res) => {
        setOpen(true);
        setMsg("User Sign Up Successfully!");
        setSeverity("success");
        navigate('/dashboard/app')
      })
      .catch(() => {
        setOpen(true);
        setMsg("Oops!! Something went wrong!!");
        setSeverity("error");
      });
  };

  return (
    <div>
      <SnackbarModule
        open={open}
        message={msg}
        handleSnackbarClose={handleSnackbarClose}
        severity={severity}
      />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="User name"
                {...getFieldProps("user_name")}
                error={Boolean(touched.user_name && errors.user_name)}
                helperText={touched.user_name && errors.user_name}
              />
            </Stack>

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={() => save()}
            >
              Register
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </div>
  );
}
