import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = () => resetPassword(password);

  // Get the userId param from the URL.
  let { token } = useParams();
  console.log(token)

  // Login into an account
  const resetPassword = async (password) => {
    const body = {
      password: password,
    };

    const res = await fetch("https://yourbudgetapp.com/resetPassword", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return response.json();
        }
      })
      .catch((err) => {
        console.log("caught it!", err);
      });

    let data = await res;
    if (data !== undefined) {
      setPasswordResetSuccess(true);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="sm">
        {passwordResetSuccess && <Alert onClose={() => { setPasswordResetSuccess(false) }}>Password reset success!!</Alert>}
        <Paper elevation={3} className="login">
          <Stack direction="row" spacing={2}>
            <h1>Reset Password</h1>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </Button>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl margin="normal" required={true}>
                <TextField
                  {...register("password", { required: "This is required", minLength: { value: 6, message: "Minimum length is 6 characters" } })}
                  error={!!errors?.password || credentialsInvalid}
                  helperText={errors?.password ? errors.password.message : null}
                  type="password"
                  label="Password"
                  variant="outlined"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl margin="normal" required={true}>
                <TextField
                  {...register("confirmPassword", { required: "This is required", minLength: { value: 6, message: "Minimum length is 6 characters" } })}
                  error={!!errors?.confirmPassword || credentialsInvalid}
                  helperText={errors?.confirmPassword ? errors.confirmPassword.message : null}
                  type="password"
                  label="Confirm Password"
                  variant="outlined"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default ResetPassword;
