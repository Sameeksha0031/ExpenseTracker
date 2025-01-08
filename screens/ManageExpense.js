import { Text, StyleSheet, View } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyle } from "../constants/styles";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId;

  console.log(isEditing);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteHandler() {
    expensesCtx.deleteExpense(editExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(editExpenseId, {
        description: "Testing",
        amount: 50.32,
        date: new Date("2025-01-06"),
      });
    } else {
      expensesCtx.addExpense({
        description: "A toy",
        amount: 45.32,
        date: new Date("2025-01-06"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={style.container}>
      <View style={style.buttons}>
        <Button style={style.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={style.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={style.deleteContainer}>
          <IconButton
            icon="trash-bin-outline"
            color={GlobalStyle.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyle.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyle.colors.primary200,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
