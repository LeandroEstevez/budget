import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import "../App.css";
import CreateExpense from "../components/CreateExpense";
import Expenses from "../components/Expenses";

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
  deleteAccount
}) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const closeDeleteAccountMOdal = (close) => {
    if (close) {
      setDeleteAccountModalOpen(false);
    }
  };

  useEffect(() => {
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.amount;
    })
    setTotalExpenses(total)
  }, [expenses])

  return (
    <Container maxWidth="md">
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

      <CreateExpense
        account={account}
        expenses={expenses}
        addExpense={addExpense}
      ></CreateExpense>
      <Stack direction="row" spacing={2} className="mb-3 mt-5">
        <h3>Total Expenses: {totalExpenses}</h3>
      </Stack>
      <Expenses
        account={account}
        expensesList={expenses}
        editExpense={editExpense}
        deleteExpense={deleteExpense} />
    </Container>
  );
};

export default Account;
