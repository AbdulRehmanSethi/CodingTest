import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import DetailScreen from "@/src/screens/DetailScreen/DetailScreen";
import { Provider } from "react-redux";
import store from "@/src/redux/store";

const explore = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <DetailScreen />
      </Provider>
    </SafeAreaView>
  );
};

export default explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
