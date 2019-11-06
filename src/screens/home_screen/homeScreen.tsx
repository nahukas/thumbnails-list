import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

export interface Ithumbnail {
  albumId: string;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface Style {
  container: ViewStyle;
  title: ViewStyle;
}

interface HomeScreenState {
  isLoading: boolean;
  thumbnails: any[];
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
          <View>
            {thumbnails.map(thumbnail => (
              <Text key={thumbnail.id}>{thumbnail.title}</Text>
            ))}
          </View>
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
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default HomeScreen;
