import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import "../App.css";
import UpdateExpense from "../components/UpdateExpense";
import Category from "./Category";
import Expense from "./Expense";
import Search from "./Search";

const Expenses = ({ expensesList, categories, editExpense, deleteExpense, getCategories }) => {
  const [targetExpense, setTargetExpense] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [arrObj, setArrObj] = useState([]);

  useEffect(() => {
    getCategories();
  }, [expensesList])

  useEffect(() => {
    let temp = [];
    let key = "";
    let arr = [];
    for (let i = 0; i < expensesList.length; i++) {
      if (expensesList[i].category.String === "") {
        arr.push(expensesList[i])
      }
    }
    if (arr.length > 0) {
      let obj = {
        key: key,
        arr: arr
      }
      temp.push(obj)
    }
    for (let i = 0; i < categories.length; i++) {
      let key = categories[i]
      let arr = expensesList.filter(
        (expense) => {
          return (
            expense.category.String === key
          );
        }
      );
      let obj = {
        key: key,
        arr: arr
      }
      temp.push(obj)
    }
    setArrObj([...temp]);
  }, [categories]);

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
      return (
        <Expense key={expense.id}
          expense={expense}
          setTargetExpense={setTargetExpense}
          setModalOpen={setModalOpen}
          deleteExpense={deleteExpense}>
        </Expense>
      )
    });

  const displayEntries = () => {
    return arrObj.map((item) => {
      return (
        <Category key={item.key}
          category={item}
          setTargetExpense={setTargetExpense}
          setModalOpen={setModalOpen}
          deleteExpense={deleteExpense}>
        </Category>
      )
    })
  }

  const displayList = () => {
    return (
      <List>
        <Stack direction="row" spacing={2} className="mb-3">
          <h3>Expenses</h3>
          {/* <FormControl>
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
          </FormControl> */}
          <Search setSearchField={setSearchField}></Search>
        </Stack>
        {searchField !== "" ? filteredDisplay() : displayEntries()}
      </List>
    )
  };

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
      {expensesList.length !== 0 ? displayList() : null}
    </Paper>
  )
}

export default Expenses
