import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/https";

function RecentExpense() {
  const expensesContext = useContext(ExpensesContext);
  //const [fetchedEXpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      expensesContext.setExpenses(expenses);
    }
    getExpenses();
  }, []);

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
