import React, {Component} from 'react';
import {ViewStyle, StyleSheet, View, TextInput, Dimensions} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

interface Style {
  textInput: ViewStyle;
}

interface SearchBarState {
  text: string;
}

interface SearchBarProps {
  filterSearch: (word: string) => void;
}

class searchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    text: '',
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.props.filterSearch(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create<Style>({
  textInput: {
    marginTop: 30,
    height: 30,
    width: screenWidth * 0.93,
    borderWidth: 1,
    borderColor: '#cecece',
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
});

export default searchBar;
