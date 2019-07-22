import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import propTypes from 'prop-types';
import api from '../../services/api';
import styles from './styles';
import OrganizationItem from './OrganizationItem';

const TabIcon = ({ tintColor }) => (
  <Icon name="list-alt" size={24} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: propTypes.string.isRequired,
};

export default class Organizations extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadOrganizations();
  }

  loadOrganizations = async () => {
    this.setState({ refreshing: true });

    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`users/${username}/orgs`);

    this.setState({ data, loading: false, refreshing: false });
  };

  renderListItem = ({ item }) => {
    return <OrganizationItem organization={item} />;
  };
  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        onRefresh={this.loadOrganizations}
        refreshing={refreshing}
      />
    );
  };
  render() {
    const { repos, loading } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Organizations" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}
