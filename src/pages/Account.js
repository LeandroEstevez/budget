import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import CreateExpense from "../components/CreateExpense";
import NavBar from "../components/NavBar";

const Account = ({
  account,
  expenses,
  updateExpenseAdd,
  updateExpenseDelete,
}) => {
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

  return (
    <Container maxWidth="sm">
      <NavBar></NavBar>
      <Paper elevation={3}>
        <h1>Start adding your expenses</h1>
        {expenses.length === 0 ? (
          <CreateExpense
            account={account}
            expenses={expenses}
            updateExpenseAdd={updateExpenseAdd}
          ></CreateExpense>
        ) : (
          <>
            <CreateExpense
              account={account}
              expenses={expenses}
              updateExpenseAdd={updateExpenseAdd}
            ></CreateExpense>
            <List>
              {expenses.map((item, index) => {
                return (
                  <ListItem key={item.id}>
                    <ListItemText primary={item.name} secondary={item.amount} />
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
