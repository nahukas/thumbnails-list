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
  thumbnails: Ithumbnail[];
  filteredThumbnails: Ithumbnail[];
  isFilter: boolean;
}

interface HomeScreenProps {
  setThumbnails: (thumbnails: Ithumbnail[]) => void;
  thumbnailsData: Ithumbnail[];
}

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  constructor(props: HomeScreenProps) {
    super(props);
    this.filterSearch = this.filterSearch.bind(this);
  }

  state: HomeScreenState = {
    thumbnails: [],
    filteredThumbnails: [],
    isLoading: true,
    isFilter: false,
  };

  componentDidMount() {
    this.fetchThumbnails();
  }

  filterSearch = (word: string) => {
    if (word === '') {
      this.setState({isFilter: false});
    } else {
      this.setState({isFilter: true});
    }
    const {thumbnails} = this.state;
    const filteredData = thumbnails.filter(thumbnail =>
      thumbnail.title.toUpperCase().includes(word.toUpperCase()),
    );
    this.setState({filteredThumbnails: filteredData});
  };

  private fetchThumbnails = async () => {
    const {setThumbnails} = this.props;
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(json => this.setState({thumbnails: json, isLoading: false}))
      .then(json => setThumbnails(json));
  };

  render() {
    const {isLoading, thumbnails, isFilter, filteredThumbnails} = this.state;
    const {thumbnailsData} = this.props;

    console.log('*******');
    console.log(thumbnailsData);
    console.log('*******');

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <SearchBar filterSearch={this.filterSearch} />
            <ThumbnailsList
              thumbnails={isFilter ? filteredThumbnails : thumbnails}
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

const mapStateToProps = ({thumbnailsData}) => ({
  thumbnailsData: thumbnailsData,
});

const mapDispatchToProps = dispatch => ({
  setThumbnails: thumbnailsData => dispatch(setThumbnails(thumbnailsData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
