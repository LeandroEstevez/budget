import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateAccount = ({ createAccount }) => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = () => createAccount(userName, fullName, email, password);

  const isValidEmail = email =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  const handleEmailValidation = email => {
    const isValid = isValidEmail(email);
    return isValid;
  };

  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} className="createAccount">
          <Stack direction="row" spacing={2}>
            <h1>Create Account</h1>
            <Button variant="contained" onClick={() => navigate("/login")}>
              Log In
            </Button>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl margin="normal" required={true}>
                <TextField
                  {...register("username", { required: "This is required", minLength: { value: 1, message: "Minimum length is 6 characters" }, maxLength: { value: 15, message: "Maximun length is 15 characters" }, pattern: { value: /^\w+$/, message: "User name must be in alphanumeric characters" } })}
                  error={!!errors?.username}
                  helperText={errors?.username ? errors.username.message : null}
                  label="Username"
                  variant="outlined"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl margin="normal" required={true}>
                <TextField
                  {...register("fullName", { required: "This is required", pattern: { value: /^\w+( \w+)*$/, message: "Full name must be in unicode characters" } })}
                  error={!!errors?.fullName}
                  helperText={errors?.fullName ? errors.fullName.message : null}
                  label="Full Name"
                  variant="outlined"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl margin="normal" required={true}>
                <TextField
                  {...register("email", { required: "This is required", validate: handleEmailValidation })}
                  error={!!errors?.email}
                  helperText={errors?.email ? "Email is not valid" : null}
                  label="Email"
                  variant="outlined"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl margin="normal" required={true}>
                <TextField
                  {...register("password", { required: "This is required", minLength: { value: 6, message: "Minimum length is 6 characters" } })}
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                  type="password"
                  label="Password"
                  variant="outlined"
                  onChange={(e) => {
                    setPassword(e.target.value);
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

export default CreateAccount;
