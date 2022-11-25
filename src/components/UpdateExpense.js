import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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

const UpdateExpense = ({ isOpen, closeModal, editExpense, targetExpense }) => {
  const [name, setName] = useState(targetExpense.name);
  const [dueDate, setDueDate] = useState(targetExpense.due_date);
  const [amount, setAmount] = useState(targetExpense.amount.toString());
  const [category, setCategory] = useState(targetExpense.category.String);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = () => {
    editExpense(targetExpense, name, dueDate, amount, category);
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
          <h1>Update expense</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl>
                <TextField
                  {...register("name", { required: "This is required", minLength: { value: 6, message: "Minimum length is 6 characters" }, maxLength: { value: 10, message: "Minimum length is 10 characters" }, pattern: { value: /^[a-zA-Z]*$/, message: "Expense name must be in unicode characters" } })}
                  error={!!errors?.name}
                  helperText={errors?.name ? errors.name.message : null}
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    {...register("dueDate", {
                      required: "This is required"
                    })}
                    label="Due Date"
                    inputFormat="MM/DD/YYYY"
                    value={dueDate}
                    onAccept={(newValue) => {
                      let date = new Date(newValue);
                      setDueDate(date.toISOString().split('T')[0]);
                    }}
                    onChange={() => {
                      return true
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl>
                <TextField
                  {...register("amount", { required: "This is required", min: { value: 1, message: "Minimum value allowed is 1" } })}
                  error={!!errors?.amount}
                  helperText={errors?.amount ? errors.amount.message : null}
                  label="Amount"
                  variant="outlined"
                  value={amount}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      setAmount(e.target.value);
                    }
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  {...register("category", { minLength: { value: 6, message: "Minimum length is 6 characters" }, maxLength: { value: 10, message: "Minimum length is 10 characters" }, pattern: { value: /^[a-zA-Z]*$/, message: "Expense category must be in unicode characters" } })}
                  error={!!errors?.category}
                  helperText={errors?.category ? errors.category.message : null}
                  label="Category"
                  variant="outlined"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
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

export default UpdateExpense;
