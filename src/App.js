import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Account from "./pages/Account";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [account, setAccount] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (account !== null) {
      getExpenses(account.username);
    }
  }, [account]);

  useEffect(() => {
    let acc = JSON.parse(window.localStorage.getItem('account'));
    if (acc !== null) {
      setAccount({ ...acc });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('account', JSON.stringify(account));
  }, [account]);

  // Create account object to send to server
  const createAccount = async (userName, fullName, email, password) => {
    const body = {
      username: userName,
      full_name: fullName,
      email: email,
      password: password,
    };

    const res = await fetch("https://yourbudgetapp.com/user", {
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

  // Delete Acccount
  const deleteAccount = async (username) => {
    await fetch(`https://yourbudgetapp.com/deleteUser/${username}`, {
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
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("caught it!", err);
      });

    setAccount(null);
  };

  // Get expenses from server
  const getExpenses = async (username) => {
    const res = await fetch(
      `https://yourbudgetapp.com/entries?username=${username}`,
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
    setExpenses([...res]);
  };

  // Delete expense
  const deleteExpense = async (id) => {
    await fetch(`https://yourbudgetapp.com/deleteEntry/${id}`, {
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

  // Edit expense
  const editExpense = async (item, name, dueDate, amount, category) => {
    let date = new Date(dueDate);

    const body = {
      username: account.username,
      id: item.id,
      name: name,
      due_date: date.toISOString().split('T')[0],
      amount: parseFloat(amount),
      category: category
    };

    const res = await fetch("https://yourbudgetapp.com/updateEntry", {
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

  // Update expense state
  const updateExpenseArray = (editedExpense) => {
    let updatedExpenses = expenses;
    updatedExpenses.forEach((item, index) => {
      if (item.id === editedExpense.id) {
        updatedExpenses[index] = editedExpense;
        return;
      }
    });
    setExpenses([...updatedExpenses]);
  };
  
  // Add expense to state
  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      {console.log("Rendering App Component")}
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
              deleteAccount={deleteAccount}
            />
          }
        ></Route>
        <Route
          path="resetpassword/:token"
          element={
            <ResetPassword />
          }
        ></Route>
      </Routes>
    </Container>
  );
}

export default App;
