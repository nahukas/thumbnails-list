import React from 'react';
import {
  ViewStyle,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ModalComponent from './modalComponent';
import {Ithumbnail} from '../config/models';

const screenWidth = Math.round(Dimensions.get('window').width);

interface ThumbnailsListProps {
  thumbnails: Ithumbnail[];
}

interface ThumbnailsListState {
  setModalVisible: boolean;
  activeThumbnailId: number;
  activeThumbnailTitle: string;
}

interface Style {
  card: ViewStyle;
  cardImage: ViewStyle;
  cardText: ViewStyle;
}

class ThumbnailsList extends React.Component<
  ThumbnailsListProps,
  ThumbnailsListState
> {
  state: ThumbnailsListState = {
    setModalVisible: false,
    activeThumbnailId: null,
    activeThumbnailTitle: '',
  };

  handlePressThumbnail = (id: number, titel: string) => {
    this.setState({
      setModalVisible: true,
      activeThumbnailId: id,
      activeThumbnailTitle: titel,
    });
  };

  handleModalClose = () => {
    this.setState({setModalVisible: false});
  };

  render() {
    const {thumbnails} = this.props;
    return (
      <SafeAreaView>
        <ScrollView>
          {thumbnails
            .filter(thumbnail => thumbnail.id < 20)
            .map(thumbnail => (
              <TouchableOpacity
                key={thumbnail.id}
                style={styles.card}
                onPress={() =>
                  this.handlePressThumbnail(thumbnail.id, thumbnail.title)
                }>
                <Image
                  style={{width: '100%', height: 150, resizeMode: 'cover'}}
                  source={{
                    uri: `https://picsum.photos/id/${thumbnail.id}/200/300/`,
                  }}
                />
                <Text style={styles.cardText}>{thumbnail.title}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
        <ModalComponent
          showModal={this.state.setModalVisible}
          onClose={this.handleModalClose}
          id={this.state.activeThumbnailId}
          title={this.state.activeThumbnailTitle}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create<Style>({
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    height: 200,
    width: screenWidth * 0.96,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {width: 3, height: 3},
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardText: {
    padding: 10,
    fontSize: 16,
  },
});

export default ThumbnailsList;
