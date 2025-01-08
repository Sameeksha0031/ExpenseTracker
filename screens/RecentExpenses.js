import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpense() {
  const expensesContext = useContext(ExpensesContext);

  const rectExpense = expensesContext.expenses.filter(
    (expenses) => expenses.id === "e2"
  );
  console.log(rectExpense);
  const recentExpense = expensesContext.expenses.filter((expenses) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expenses.date >= date7DaysAgo && expenses.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpense}
      expensesPeriod={"Last 7 days"}
      fallback="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpense;
