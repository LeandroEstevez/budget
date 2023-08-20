import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";

const Login = ({ setAccount }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [forgotPasswordEmailSuccess, setForgotPasswordEmailSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = () => login(userName, password);

  const closeModal = (close) => {
    if (close) {
      setModalOpen(false);
    }
  };

  // Login into an account
  const login = async (userName, password) => {
    const body = {
      username: userName,
      password: password,
    };

    const res = await fetch("https://yourbudgetapp.com/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          setCredentialsInvalid(true);
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
      data.user.access_token = data.access_token;
      setAccount({ ...data.user });
      navigate("/account");
    }
  };

  // Login into an account
  const forgotPassword = async (userName) => {
    const body = {
      username: userName,
    };

    const res = await fetch("https://yourbudgetapp.com/forgotpassword", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
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
      setForgotPasswordEmailSuccess(true);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="sm">
        {forgotPasswordEmailSuccess && <Alert onClose={() => { setForgotPasswordEmailSuccess(false) }}>Reset password email successfully sent!!</Alert>}
        {
          modalOpen && <ForgotPassword
            isOpen={modalOpen}
            closeModal={closeModal}
            forgotPassword={forgotPassword}
            forgotPasswordEmailSuccess={forgotPasswordEmailSuccess}
          ></ForgotPassword>
        }
        <Paper elevation={3} className="login">
          <Stack direction="row" spacing={2}>
            <h1>Log In</h1>
            <Button variant="contained" onClick={() => navigate("/")}>
              Create Account
            </Button>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl margin="normal" required={true}>
                <TextField
                  {...register("username", { required: "This is required", minLength: { value: 6, message: "Minimum length is 6 characters" }, maxLength: { value: 10, message: "Minimum length is 10 characters" }, pattern: { value: /^\w+$/, message: "User name must be in alphanumeric characters" } })}
                  error={!!errors?.username || credentialsInvalid}
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
              {credentialsInvalid && <h4>Login Incorrect</h4>}
              <Button
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
              <Button variant="text" onClick={() => {
                setModalOpen(true);
              }}>Forgot Password</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
