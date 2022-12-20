import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateExpense = ({ account, addExpense }) => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = () => {
    createExpenseObject(name, dueDate, amount, category);
    setName("");
    setDueDate(new Date());
    setAmount("");
    setCategory("")
  };

  // Create expense to send to server
  const createExpenseObject = async (name, dueDate, amount, category) => {
    let date = new Date(dueDate);

    const newExpense = {
      username: account.username,
      name: name,
      due_date: date.toISOString().split('T')[0],
      amount: parseFloat(amount),
      category: category,
    };

    const res = await fetch("http://localhost:8080/entry", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${account.access_token}`,
      },
      body: JSON.stringify(newExpense),
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

    addExpense(res.entry);
  };

  return (
    <Container maxWidth="sm" className="mt-5">
      <h1>Create expense</h1>
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
                  setDueDate(newValue);
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
    </Container>
  );
};

export default CreateExpense;
