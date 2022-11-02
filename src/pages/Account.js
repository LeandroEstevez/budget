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
  addExpense,
  deleteExpense,
  editExpense,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [targetExpense, setTargetExpense] = useState({});

  const closeModal = (close) => {
    if (close) {
      setModalOpen(false);
    }
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
            addExpense={addExpense}
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
              addExpense={addExpense}
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
