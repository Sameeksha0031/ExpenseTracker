import { ActivityIndicator, View, StyleSheet } from "react-native";
import { GlobalStyle } from "../../constants/styles";

function LoadingOverlay() {
  return (
    <View style={styles.conatiner}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyle.colors.primary700,
  },
});
