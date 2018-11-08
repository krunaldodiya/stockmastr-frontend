import React from 'react';
import { View } from 'react-native';

// component
import { compose, withApollo } from 'react-apollo';
import BottomMenu from '../components/BottomMenu';
// tabs
import HomeTab from '../components/tabs/Home';
import NotificationsTab from '../components/tabs/Notifications';
import NewsTab from '../components/tabs/News';
import SettingsTab from '../components/tabs/Settings';
import ShareMenu from '../components/ShareMenu';

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

        <ShareMenu />
      </View>
    );
  }
}

export default compose(withApollo)(TabScreen);
