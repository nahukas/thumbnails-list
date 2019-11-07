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
}

class searchBar extends Component<SearchBarState & SearchBarProps> {
  constructor(props: SearchBarProps) {
    super(props);
  }

  state: SearchBarState = {
    text: '',
  };

  filterSearch = (text: string) => {
    this.setState({text: text});
    const {thumbnails} = this.props;
    const filteredData = thumbnails.filter(thumbnail =>
      thumbnail.title.toUpperCase().includes(text.toUpperCase()),
    );
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

const mapStateToProps = ({thumbnailsData}) => ({
  thumbnailsData: thumbnailsData,
});

export default connect(
  mapStateToProps,
  null,
)(searchBar);
