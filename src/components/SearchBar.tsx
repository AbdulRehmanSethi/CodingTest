import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies..."
        value={searchTerm}
        onChangeText={onSearch}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default SearchBar;
