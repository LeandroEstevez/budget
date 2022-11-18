import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "../App.css";
import CreateExpense from "../components/CreateExpense";
import UpdateExpense from "../components/UpdateExpense";

const Expenses = ({ account, expensesList, addExpense, editExpense, deleteExpense }) => {
  const [order, setOrder] = useState("amount");
  const [targetExpense, setTargetExpense] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [searchField, setSearchField] = useState("");

  console.log(searchField);

  const closeModal = (close) => {
    if (close) {
      setModalOpen(false);
    }
  };

  const filteredExpense = expensesList.filter(
    (expense) => {
      return (
        expense
          .name
          .toLowerCase()
          .includes(searchField.toLowerCase())
      );
    }
  );
  const filteredDisplay = () =>
    filteredExpense.map((expense) => {
      return (< ListItem key={expense.id} >
        <ListItemText primary={expense.name} />
        <ListItemText primary={expense.amount} />
        <ListItemText primary={expense.due_date} />
        <Button
          variant="contained"
          onClick={() => {
            setTargetExpense({ ...expense });
            setModalOpen(true);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            deleteExpense(expense.id);
          }}
        >
          Delete
        </Button>
      </ListItem >)
    });

  const sortEntries = (order, expensesList) => {
    if (order === "amount") {
      expensesList.sort((a, b) => {
        if (a.amount < b.amount) {
          return -1;
        }
        if (a.amount > b.amount) {
          return 1;
        }

        return 0;
      });
      return expensesList;
    } else if (order === "date") {
      expensesList.sort((a, b) => {
        const aDate = new Date(a.due_date);
        const bDate = new Date(b.due_date);
        if (aDate < bDate) {
          return -1;
        }
        if (aDate > bDate) {
          return 1;
        }

        return 0;
      });
      return expensesList;
    } else if (order === "name") {
      expensesList.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }

        return 0;
      });
      return expensesList;
    }
  };
  const displayEntries = () => sortEntries(order, expensesList).map((item) => {
    return (
      <ListItem key={item.id}>
        <ListItemText primary={item.name} />
        <ListItemText primary={item.amount} />
        <ListItemText primary={item.due_date} />
        <Button
          variant="contained"
          onClick={() => {
            setTargetExpense({ ...item });
            setModalOpen(true);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            deleteExpense(item.id);
          }}
        >
          Delete
        </Button>
      </ListItem>
    );
  })
  const displayList = () => {
    return (
      <List>
        <Stack direction="row" spacing={2} className="mb-3 mt-5">
          <h3>Expenses</h3>
          <FormControl>
            <InputLabel id="select-label">Order By</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={order}
              label="Order By"
              onChange={(e) => {
                setOrder(e.target.value);
              }}
            >
              <MenuItem value="amount">Amount</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal" required={true}>
            <TextField
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setSearchField(e.target.value);
              }}
            />
          </FormControl>
        </Stack>
        {searchField !== "" ? filteredDisplay() : displayEntries()}
      </List>
    )
  }

  return (
    <Paper elevation={3} className="account">
      {
        modalOpen && <UpdateExpense
          isOpen={modalOpen}
          closeModal={closeModal}
          editExpense={editExpense}
          targetExpense={targetExpense}
        ></UpdateExpense>
      }
      <CreateExpense
        account={account}
        expensesList={expensesList}
        addExpense={addExpense}
      ></CreateExpense>
      {expensesList.length !== 0 ? displayList() : null}
    </Paper>
  )
}

export default Expenses
