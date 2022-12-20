import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ForgotPassword = ({ isOpen, closeModal, forgotPassword, forgotPasswordEmailSuccess }) => {
  const [username, setUsername] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = () => {
    forgotPassword(username);
    closeModal(true);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => closeModal(true)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={() => closeModal(true)}>Close</Button>
          <h1>Forgot Password</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl>
                <TextField
                  {...register("username", { required: "This is required", minLength: { value: 6, message: "Minimum length is 6 characters" }, maxLength: { value: 10, message: "Minimum length is 10 characters" } })}
                  error={!!errors?.username}
                  helperText={errors?.username ? errors.username.message : null}
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
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
        </Box>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
