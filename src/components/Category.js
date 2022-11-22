import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import "../App.css";
import Expense from "./Expense";

const Category = ({ category, setTargetExpense, setModalOpen, deleteExpense }) => {
  return (
    <Accordion key={category.key}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h5>{category.key === "" ? "No category" : category.key}</h5>
      </AccordionSummary>
      <AccordionDetails>
        {
          category.arr.map((expense) => {
            return (
              <Expense
                expense={expense}
                setTargetExpense={setTargetExpense}
                setModalOpen={setModalOpen}
                deleteExpense={deleteExpense}>
              </Expense>
            )
          })
        }
      </AccordionDetails>
    </Accordion>
  )
}

export default Category
