import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Account from "./pages/Account";
import CreateAccount from "./pages/CreateAccount";

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

  const navigate = useNavigate();

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={<CreateAccount createAccountObject={createAccountObject} />}
        ></Route>
        <Route
          path="account"
          element={<Account account={account} expenses={expenses} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
