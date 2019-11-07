import React, {Component} from 'react';
import {ViewStyle, StyleSheet, View, TextInput, Dimensions} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
import {connect} from 'react-redux';
import {Ithumbnail} from '../config/models';

interface Style {
  textInput: ViewStyle;
}

interface SearchBarState {
  text: string;
}

interface SearchBarProps {
  thumbnails: Ithumbnail[];
  filterSearch: (word: string) => void;
}

class searchBar extends Component<SearchBarState & SearchBarProps> {
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

const mapStateToProps = ({thumbnailsData}) => ({
  thumbnailsData: thumbnailsData,
});

export default connect(
  mapStateToProps,
  null,
)(searchBar);
