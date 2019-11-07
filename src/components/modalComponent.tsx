import React from 'react';
import {
  Modal,
  Text,
  ViewStyle,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  id: number;
  title: string;
}

interface Style {
  container: ViewStyle;
  closeButton: ViewStyle;
  closeButtonIcon: ViewStyle;
  title: ViewStyle;
}

class ModalComponent extends React.Component<ModalProps> {
  constructor(props: ModalProps) {
    super(props);
  }

  handleClose = () => {
    return this.props.onClose();
  };

  render() {
    const {showModal, title, id} = this.props;
    return (
      <View style={{flex: 1, marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={this.handleClose}>
          <View style={styles.container}>
            <TouchableHighlight onPress={this.handleClose}>
              <View style={styles.closeButton}>
                <Text>X</Text>
              </View>
            </TouchableHighlight>
            <Image
              style={{width: '100%', height: 150, resizeMode: 'cover'}}
              source={{
                uri: `https://picsum.photos/id/${id}/200/300/`,
              }}
            />
            <Text style={styles.title}>{title}</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    height: 200,
    width: screenWidth,
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignContent: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    height: 20,
    width: 20,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  closeButtonIcon: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
  },
});

export default ModalComponent;
