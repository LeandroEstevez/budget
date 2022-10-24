import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import CreateExpense from "../components/CreateExpense";
import UpdateExpense from "../components/UpdateExpense";

const Account = ({
  account,
  expenses,
  updateExpenseAdd,
  updateExpenseDelete,
  updateExpenseEdit,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [targetExpense, setTargetExpense] = useState({});

  const closeModal = (close) => {
    close && setModalOpen(false);
  };

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
          updateExpenseDelete(id);
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

    updateExpenseEdit(res);
    setModalOpen(false);
  };

  return (
    <Container maxWidth="md">
      {/* <NavBar></NavBar> */}
      <h1 className="mb-5 mt-5">Start adding your expenses</h1>
      <Paper elevation={3} className="account">
        {expenses.length === 0 ? (
          <CreateExpense
            account={account}
            expenses={expenses}
            updateExpenseAdd={updateExpenseAdd}
          ></CreateExpense>
        ) : (
          <>
            {modalOpen && (
              <UpdateExpense
                isOpen={modalOpen}
                closeModal={closeModal}
                editExpense={editExpense}
                targetExpense={targetExpense}
              ></UpdateExpense>
            )}
            <CreateExpense
              account={account}
              expenses={expenses}
              updateExpenseAdd={updateExpenseAdd}
            ></CreateExpense>
            <List>
              <h3 className="mb-3 mt-5">Expenses</h3>
              {expenses.map((item) => {
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
              })}
            </List>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Account;
