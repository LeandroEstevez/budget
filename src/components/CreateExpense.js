import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const CreateExpense = ({ account, addExpense }) => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");

  // Create expense to send to server
  const createExpenseObject = async (name, dueDate, amount) => {
    const newExpense = {
      username: account.username,
      name: name,
      due_date: dueDate,
      amount: amount,
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
    <Container maxWidth="sm">
      <h1>Create expense</h1>
      <Stack spacing={2}>
        <FormControl>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Due Date"
            variant="outlined"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          />
        </FormControl>
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
            setName("");
            setDueDate("");
            setAmount("");
            createExpenseObject(name, dueDate, amount);
          }}
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default CreateExpense;
