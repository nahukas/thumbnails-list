import React, {SFC} from 'react';
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

const screenWidth = Math.round(Dimensions.get('window').width);

export interface Ithumbnail {
  albumId: string;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface ThumbnailsListProps {
  thumbails: Ithumbnail[];
}

interface Style {
  card: ViewStyle;
  cardImage: ViewStyle;
  cardText: ViewStyle;
}

const ThumbnailsList: React.SFC<ThumbnailsListProps> = props => {
  return (
    <SafeAreaView>
      <ScrollView>
        {props.thumbails
          .filter(thumbnail => thumbnail.id < 20)
          .map(thumbnail => (
            <TouchableOpacity key={thumbnail.id} style={styles.card}>
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
    </SafeAreaView>
  );
};

export default ThumbnailsList;

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
