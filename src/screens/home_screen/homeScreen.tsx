import React from 'react';
import {StyleSheet, ViewStyle, View, ActivityIndicator} from 'react-native';
import ThumbnailsList from '../../components/thumbnailsList';
import SearchBar from '../../components/searchBar';
import {Header} from 'react-navigation-stack';
import {Ithumbnail} from '../../config/models';
import {connect} from 'react-redux';
import {setThumbnails} from '../../redux/thumbnail/thumbnail.actions';

interface Style {
  container: ViewStyle;
}

interface HomeScreenState {
  isLoading: boolean;
  filteredThumbnails: Ithumbnail[];
  isFilter: boolean;
}

interface HomeScreenProps {
  setThumbnails: (thumbnailsData) => void;
  thumbnailsData: Ithumbnail[];
}

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  constructor(props: HomeScreenProps) {
    super(props);
    this.filterSearch = this.filterSearch.bind(this);
  }

  state: HomeScreenState = {
    filteredThumbnails: [],
    isLoading: false,
    isFilter: false,
  };

  componentDidMount() {
    this.fetchThumbnails();
  }

  filterSearch = (word: string) => {
    const {thumbnailsData} = this.props;
    if (word === '') {
      this.setState({isFilter: false});
    } else {
      this.setState({isFilter: true});
      const filteredData = thumbnailsData.filter(thumbnail =>
        thumbnail.title.toUpperCase().includes(word.toUpperCase()),
      );
      this.setState({filteredThumbnails: filteredData});
    }
  };

  private fetchThumbnails = async () => {
    const {setThumbnails} = this.props;
    this.setState({isLoading: true});

    let response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    let responseJson = await response.json();
    setThumbnails(responseJson);

    this.setState({isLoading: false});
  };

  render() {
    const {isLoading, isFilter, filteredThumbnails} = this.state;
    const {thumbnailsData} = this.props;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <SearchBar filterSearch={this.filterSearch} />
            <ThumbnailsList
              thumbnails={isFilter ? filteredThumbnails : thumbnailsData}
            />
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

const mapStateToProps = ({thumbnail}) => ({
  thumbnailsData: thumbnail.thumbnailsData,
});

const mapDispatchToProps = dispatch => ({
  setThumbnails: thumbnailsData => dispatch(setThumbnails(thumbnailsData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
