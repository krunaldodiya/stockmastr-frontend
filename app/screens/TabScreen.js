import React from 'react';
import { View } from 'react-native';

// component
import { compose, withApollo } from 'react-apollo';
import BottomMenu from '../components/BottomMenu';
// tabs
import HomeTab from '../components/tabs/HomeTab';
import NotificationsTab from '../components/tabs/NotificationsTab';
import NewsTab from '../components/tabs/NewsTab';
import SettingsTab from '../components/tabs/SettingsTab';

class TabScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'home',
    };
  }

  changeTab = async (tab) => {
    this.setState({ currentTab: tab });
  };

  render() {
    const { currentTab } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {currentTab === 'home' && <HomeTab {...this.props} />}
          {currentTab === 'notifications' && <NotificationsTab {...this.props} />}
          {currentTab === 'news' && <NewsTab {...this.props} />}
          {currentTab === 'settings' && <SettingsTab {...this.props} />}
        </View>

        <BottomMenu currentTab={currentTab} changeTab={this.changeTab} />
      </View>
    );
  }
}

export default compose(withApollo)(TabScreen);
