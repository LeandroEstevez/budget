import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import "../App.css";
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
  deleteAccount,
}) => {
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const closeDeleteAccountMOdal = (close) => {
    if (close) {
      setDeleteAccountModalOpen(false);
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
      {/* Account deletion modal */}
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
      <Expenses account={account}
        expensesList={expenses}
        addExpense={addExpense}
        editExpense={editExpense}
        deleteExpense={deleteExpense} />
    </Container>
  );
};

export default Account;
