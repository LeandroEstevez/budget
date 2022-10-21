import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const Login = ({ login }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3}>
          <h1>Log In</h1>
          <FormControl>
            <TextField
              label="Username"
              variant="outlined"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
          <Button variant="contained" onClick={() => login(userName, password)}>
            Submit
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
