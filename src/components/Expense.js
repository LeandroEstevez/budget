import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "../App.css";

const Expense = ({ expense, setTargetExpense, setModalOpen, deleteExpense }) => {
  return (
    <ListItem key={expense.id}>
      <ListItemText primary={expense.name} />
      <ListItemText primary={expense.amount} />
      <ListItemText primary={expense.due_date} />
      <Button
        variant="contained"
        onClick={() => {
          setTargetExpense({ ...expense });
          setModalOpen(true);
        }}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          deleteExpense(expense.id);
        }}
      >
        Delete
      </Button>
    </ListItem>
  )
}

export default Expense
