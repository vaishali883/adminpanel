import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import SnackbarModule from "../../../pages/sanckbar";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const handleSnackbarClose = () => {
    setOpen(false);
    // window.location.reload();
  };


  const LoginSchema = Yup.object().shape({
    user_name: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      user_name: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      save()
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const save = () => {
    console.log(formik.values);
    const data = {
      user_name: formik.values.user_name,
      password: formik.values.password,
    };
    axios
      .get(
        `http://localhost:4000/adminUser/login/?name=${data.user_name}&password=${data.password}`
      )
      .then((res) => {
        localStorage.setItem("userName",res.data.order[0].user_name);
        localStorage.setItem("userEmail",res.data.order[0].Email);
        setOpen(true);
        setMsg("User Login Successfully!");
        setSeverity("success");
        navigate("/dashboard/app", { replace: true });
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
            <TextField
              fullWidth
              autoComplete="user_name"
              type="user_name"
              label="User Name"
              {...getFieldProps("user_name")}
              error={Boolean(touched.user_name && errors.user_name)}
              helperText={touched.user_name && errors.user_name}
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
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps("remember")}
                  checked={values.remember}
                />
              }
              label="Remember me"
            />

            
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
    </div>
  );
}
