import React from 'react';
import {StyleSheet, ViewStyle, View, ActivityIndicator} from 'react-native';
import ThumbnailsList from '../../components/thumbnailsList';
import SearchBar from '../../components/searchBar';
import {Header} from 'react-navigation-stack';
import {Ithumbnail} from '../../config/models';

interface Style {
  container: ViewStyle;
}

interface HomeScreenState {
  isLoading: boolean;
  thumbnails: Ithumbnail[];
}

interface HomeScreenProps {}

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  constructor(props: HomeScreenProps) {
    super(props);
    this.state = {
      thumbnails: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchThumbnails();
  }

  private fetchThumbnails = async () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(json => this.setState({thumbnails: json, isLoading: false}));
  };

  render() {
    const {isLoading, thumbnails} = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <SearchBar text={''} />
            <ThumbnailsList thumbails={thumbnails} />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: Header.HEIGHT * 0.2,
  },
});

export default HomeScreen;
