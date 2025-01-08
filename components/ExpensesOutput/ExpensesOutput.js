import { DUMMY_EXPENSES } from "../../constants/dummy_expenses";
import { GlobalStyle } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpenseSummary from "./ExpensesSummary";
import { View, StyleSheet, Text } from "react-native";

function ExpensesOutput({ expenses, expensesPeriod, fallback }) {
  let content = <Text style={styles.infoText}>{fallback}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyle.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
});
