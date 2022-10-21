import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CreateExpense from "../components/CreateExpense";
import NavBar from "../components/NavBar";

const Account = ({ account, expenses }) => {
  return (
    <Container maxWidth="sm">
      <NavBar></NavBar>
      <Paper elevation={3}>
        <h1>Start adding your expenses</h1>
        {expenses.length === 0 ? (
          <CreateExpense account={account}></CreateExpense>
        ) : (
          <h1>"We have expenses"</h1>
        )}
      </Paper>
    </Container>
  );
};

export default Account;
