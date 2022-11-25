import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from "@mui/material/Stack";
import { useState } from "react";
import "../App.css";
import Expense from "./Expense";

const Category = ({ category, setTargetExpense, setModalOpen, deleteExpense }) => {
  const [order, setOrder] = useState("amount");

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

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack direction="row" spacing={2}>
          <h5>{category.key === "" ? "No category" : category.key}</h5>
          <FormControl>
            <InputLabel id="select-label">Order By</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={order}
              label="Order By"
              onChange={(e) => {
                setOrder(e.target.value);
                sortEntries(e.target.value, category.arr)
              }}
            >
              <MenuItem value="amount">Amount</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {
          category.arr.map((expense) => {
            return (
              <Expense
                key={expense.id}
                expense={expense}
                setTargetExpense={setTargetExpense}
                setModalOpen={setModalOpen}
                deleteExpense={deleteExpense}>
              </Expense>
            )
          })
        }
      </AccordionDetails>
    </Accordion>
  )
}

export default Category
