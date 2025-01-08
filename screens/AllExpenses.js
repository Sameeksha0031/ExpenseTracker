import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpense() {
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      expensesPeriod={"Total"}
      fallback={"No registered expenses found!"}
    />
  );
}

export default AllExpense;
