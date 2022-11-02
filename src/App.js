import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Account from "./pages/Account";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";

function App() {
  const [account, setAccount] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (account !== null) {
      getExpenses(account.username);
    }
  }, [account]);

  // Create account object to send to server
  const createAccount = async (userName, fullName, email, password) => {
    const body = {
      username: userName,
      full_name: fullName,
      email: email,
      password: password,
    };

    const res = await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        } else {
          navigate("Account");
          return response.json();
        }
      })
      .catch((err) => {
        console.log("caught it!", err);
      });

    setAccount({ ...res });
  };

  // Get expenses from server
  const getExpenses = async (username) => {
    const res = await fetch(
      `http://localhost:8080/entries?username=${username}`,
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

    setExpenses([...expenses, ...res]);
  };

  // Update expenses
  const deleteExpense = async (id) => {
    await fetch(`http://localhost:8080/deleteEntry/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${account.access_token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        } else {
          setExpenses(expenses.filter((expense) => expense.id !== id));
        }
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  };
  const editExpense = async (item, amount) => {
    const body = {
      username: account.username,
      id: item.id,
      amount: amount,
    };

    const res = await fetch("http://localhost:8080/updateEntry", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${account.access_token}`,
      },
      body: JSON.stringify(body),
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

    updateExpenseArray(res);
  };
  const updateExpenseArray = (editedExpense) => {
    console.log(editedExpense);
    let updatedExpenses = expenses;
    updatedExpenses.forEach((item, index) => {
      if (item.id === editedExpense.id) {
        updatedExpenses[index] = editedExpense;
        return;
      }
    });
    setExpenses([...updatedExpenses]);
  };
  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Routes>
        <Route
          path="/"
          element={<CreateAccount createAccount={createAccount} />}
        ></Route>
        <Route
          path="/login"
          element={<Login setAccount={setAccount} />}
        ></Route>
        <Route
          path="account"
          element={
            <Account
              account={account}
              expenses={expenses}
              editExpense={editExpense}
              addExpense={addExpense}
              deleteExpense={deleteExpense}
            />
          }
        ></Route>
      </Routes>
    </Container>
  );
}

export default App;
