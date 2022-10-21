import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const CreateExpense = ({ account, updateExpenses }) => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState(0);

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

    updateExpenses(res.entry);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3}>
          <h1>Create expense</h1>
          <FormControl>
            <TextField
              label="Name"
              variant="outlined"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Due Date"
              variant="outlined"
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Amount"
              variant="outlined"
              onChange={(e) => {
                setAmount(parseFloat(e.target.value));
                console.log(amount);
              }}
            />
          </FormControl>
          <Button
            variant="contained"
            onClick={() => createExpenseObject(name, dueDate, amount)}
          >
            Submit
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default CreateExpense;
