import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import "../App.css";
import UpdateExpense from "../components/UpdateExpense";
import Category from "./Category";
import Expense from "./Expense";
import Search from "./Search";

const Expenses = ({ account, expensesList, editExpense, deleteExpense }) => {
  const [categories, setCategories] = useState([]);
  const [targetExpense, setTargetExpense] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [arrObj, setArrObj] = useState([]);

  useEffect(() => {
    if (account != null) {
      getCategories(account.username);
    }
  }, [expensesList])

  useEffect(() => {
    organizeCategories();
  }, [categories]);

  const organizeCategories = () => {
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
  }

  // Get categories of expenses from server
  const getCategories = async (username) => {
    const res = await fetch(
      `https://yourbudgetapp.com/categories?username=${username}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${account.access_token}`,
        },
      }
    )
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

    // Extract string from object array
    const arr = res.map((item) => {
      return item.String
    })
    console.log(arr);
    // remove duplicates
    const filteredArr = arr.filter((item,
      index) => arr.indexOf(item) === index);
    setCategories([...filteredArr]);
  };

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
