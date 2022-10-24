import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Account from "./pages/Account";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";

function App() {
  const [account, setAccount] = useState({});
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpensesFromServer(account.username);
  }, [account]);

  // Create account object to send to server
  const createAccountObject = (userName, fullName, email, password) => {
    const newAccount = {
      username: userName,
      full_name: fullName,
      email: email,
      password: password,
    };

    createAccountInServer(newAccount);
  };
  const createAccountInServer = async (newAccount) => {
    const res = await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newAccount),
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

  // Login into an account
  const loginToAccount = async (userName, password) => {
    const body = {
      username: userName,
      password: password,
    };

    let data = await login(body);
    data.user.access_token = data.access_token;
    setAccount({ ...data.user });
    navigate("account");
  };
  const login = async (body) => {
    const res = await fetch("http://localhost:8080/user/login", {
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
          return response.json();
        }
      })
      .catch((err) => {
        console.log("caught it!", err);
      });

    return res;
  };

  // Update expenses
  const updateExpenseAdd = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };
  const updateExpenseDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };
  const updateExpenseEdit = (editedExpense) => {
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

  // Get expenses from server
  const getExpensesFromServer = async (username) => {
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

  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Routes>
        <Route
          path="/"
          element={<CreateAccount createAccountObject={createAccountObject} />}
        ></Route>
        <Route path="/login" element={<Login login={loginToAccount} />}></Route>
        <Route
          path="account"
          element={
            <Account
              account={account}
              expenses={expenses}
              updateExpenseEdit={updateExpenseEdit}
              updateExpenseAdd={updateExpenseAdd}
              updateExpenseDelete={updateExpenseDelete}
            />
          }
        ></Route>
      </Routes>
    </Container>
  );
}

export default App;
