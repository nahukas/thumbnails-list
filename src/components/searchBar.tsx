import React, {Component} from 'react';
import {ViewStyle, StyleSheet, View, TextInput, Dimensions} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

interface Style {
  textInput: ViewStyle;
}

interface SearchBarState {
  text: string;
}

class searchBar extends Component<SearchBarState> {
  state: SearchBarState = {
    text: '',
  };

  filterSearch = (text: string) => {
    this.setState({text: text});
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.filterSearch(text)}
          value={this.state.text}
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
