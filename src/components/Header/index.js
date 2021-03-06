import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import styles from './styles';

class Header extends Component {
  static propTypes = {
    title: propTypes.string.isRequired,
    navigation: propTypes.shape({
      navigate: propTypes.func,
    }),
  };

  signOut = async () => {
    const { navigation } = this.props;

    await AsyncStorage.clear();
    navigation.navigate('Welcome');
  };

  render() {
    const { title } = this.props;
    console.tron.log(this.props);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.left} />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={this.signOut}>
          <Icon name="exchange" size={16} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Header);
