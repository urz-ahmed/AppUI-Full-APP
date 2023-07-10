import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        value={props.searchText}
        onChangeText={(text) => props.setSearchText(text)}
        onSubmitEditing={props.onSubmit}
      />
    </View>
  )
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    color: "#000",
    borderWidth: 1
  }
});
