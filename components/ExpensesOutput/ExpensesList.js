import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return (
    <ExpenseItem
      id={itemData.item.id}
      description={itemData.item.description}
      date={itemData.item.date}
      amount={itemData.item.amount}
    />
  );
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
