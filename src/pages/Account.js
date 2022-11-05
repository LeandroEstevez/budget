import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import "../App.css";
import CreateExpense from "../components/CreateExpense";
import UpdateExpense from "../components/UpdateExpense";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Account = ({
  account,
  expenses,
  addExpense,
  deleteExpense,
  editExpense,
  deleteAccount,
}) => {
  const [order, setOrder] = useState("amount");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [targetExpense, setTargetExpense] = useState({});

  const closeModal = (close) => {
    if (close) {
      setModalOpen(false);
    }
  };

  const closeDeleteAccountMOdal = (close) => {
    if (close) {
      setDeleteAccountModalOpen(false);
    }
  };

  const sortEntries = (order, expenses) => {
    if (order === "amount") {
      expenses.sort((a, b) => {
        if (a.amount < b.amount) {
          return -1;
        }
        if (a.amount > b.amount) {
          return 1;
        }

        return 0;
      });
      return expenses;
    } else if (order === "date") {
      expenses.sort((a, b) => {
        const aDate = new Date(a.due_date);
        const bDate = new Date(b.due_date);
        if (aDate < bDate) {
          return -1;
        }
        if (aDate > bDate) {
          return 1;
        }

        return 0;
      });
      return expenses;
    } else if (order === "name") {
      expenses.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }

        return 0;
      });
      return expenses;
    }
  };

  return (
    <Container maxWidth="md">
      {/* <NavBar></NavBar> */}
      <h1 className="mb-5 mt-5">Start adding your expenses</h1>
      <Button
        variant="contained"
        onClick={() => {
          setDeleteAccountModalOpen(true);
        }}
      >
        Delete Account
      </Button>
      <Modal
        open={deleteAccountModalOpen}
        onClose={() => closeDeleteAccountMOdal(true)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Are you sure?</h1>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => {
                  deleteAccount(account.username);
                }}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={() => closeDeleteAccountMOdal(true)}
              >
                No
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
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
              <Stack direction="row" spacing={2} className="mb-3 mt-5">
                <h3>Expenses</h3>
                <FormControl>
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
                </FormControl>
              </Stack>
              {sortEntries(order, expenses).map((item) => {
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
