import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

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

const UpdateExpense = ({ isOpen, closeModal, editExpense, targetExpense }) => {
  const [open, setOpen] = useState(isOpen);
  const [amount, setAmount] = useState("");

  const handleClose = () => {
    closeModal(true);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={handleClose}>Close</Button>
          <h1>Update expense</h1>
          <Stack spacing={2}>
            <FormControl>
              <TextField
                label="Amount"
                variant="outlined"
                value={amount}
                onChange={(e) => {
                  setAmount(parseFloat(e.target.value));
                }}
              />
            </FormControl>
            <Button
              variant="contained"
              onClick={() => {
                editExpense(targetExpense, amount);
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateExpense;
