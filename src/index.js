import React, { Component } from 'react';

import { AsyncStorage } from 'react-native';
import './config/ReactotronConfig';
import createNavigator from './routes';

// import { Container } from './styles';

export default class App extends Component {
  state = {
    userChecked: false, //flag que diz se o asyncstorage já foi checado
    userLogged: false, //flag que avisa se há alguma nome de usuário no asyncstorage
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Githuber:username');

    this.setState({
      userChecked: true,
      userLogged: !!username,
    });
  }

  render() {
    const { userChecked, userLogged } = this.state;

    if (!userChecked) {
      return null;
    }

    const Routes = createNavigator(userLogged);

    return <Routes />;
  }
}
