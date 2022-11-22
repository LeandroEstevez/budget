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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (account !== null) {
      getExpenses(account.username);
      getCategories();
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

  // Delete Acccount
  const deleteAccount = async (username) => {
    await fetch(`http://localhost:8080/deleteUser/${username}`, {
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
    setExpenses([...res]);
  };

  // Get categories of expenses from server
  const getCategories = async () => {
    const res = await fetch(
      "http://localhost:8080/categories",
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
    // remove duplicates
    const filteredArr = arr.filter((item,
      index) => arr.indexOf(item) === index);
    console.log(filteredArr)
    setCategories([...filteredArr]);
  };

  // Delete expense
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

    console.log(body)

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

    console.log(res)
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
              categories={categories}
              editExpense={editExpense}
              addExpense={addExpense}
              deleteExpense={deleteExpense}
              deleteAccount={deleteAccount}
              getCategories={getCategories}
            />
          }
        ></Route>
      </Routes>
    </Container>
  );
}

export default App;
