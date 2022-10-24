import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const CreateAccount = ({ createAccountObject }) => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} className="createAccount">
          <h1>Create Account</h1>
          <Stack spacing={2}>
            <FormControl margin="normal" required={true}>
              <TextField
                label="Username"
                variant="outlined"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl margin="normal" required={true}>
              <TextField
                label="Full Name"
                variant="outlined"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl margin="normal" required={true}>
              <TextField
                label="Email"
                variant="outlined"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl margin="normal" required={true}>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <Button
              variant="contained"
              onClick={() =>
                createAccountObject(userName, fullName, email, password)
              }
            >
              Submit
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default CreateAccount;
