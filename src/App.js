import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Account from "./pages/Account";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";

function App() {
  const [account, setAccount] = useState({});
  const [expenses, setExpenses] = useState([]);

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

    console.log(res);
    setAccount({ ...res });
  };

  // Login into an account
  const loginToAccount = (userName, password) => {
    const body = {
      username: userName,
      password: password,
    };

    login(body);
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
          navigate("Account");
          return response.json();
        }
      })
      .catch((err) => {
        console.log("caught it!", err);
      });

    console.log(res);
    res.user.access_token = res.access_token;
    setAccount({ ...res.user });
    console.log(account);
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={<CreateAccount createAccountObject={createAccountObject} />}
        ></Route>
        <Route path="/login" element={<Login login={loginToAccount} />}></Route>
        <Route
          path="account"
          element={<Account account={account} expenses={expenses} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
