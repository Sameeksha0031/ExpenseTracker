import { StyleSheet, View } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyle } from "../constants/styles";
import { useContext, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updatedExpense } from "../util/https";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [error, setError] = useState();
  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId;
  const [isFetching, setIsFetching] = useState(false);

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteHandler() {
    setIsFetching(true);
    try {
      await deleteExpense(editExpenseId);
      expensesCtx.deleteExpense(editExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsFetching(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function errorHandler() {
    setError(null);
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  async function confirmHandler(expenseData) {
    setIsFetching(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editExpenseId, expenseData);
        await updatedExpense(editExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsFetching(false);
    }
  }

  return (
    <View style={style.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Updating" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
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
});
