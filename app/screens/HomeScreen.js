import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Tab,
  Tabs,
  Spinner,
} from "native-base";

// components
import Home from "../components/Menus/Home";
import Feeds from "../components/Tabs/Feeds";
import Chat from "../components/Tabs/Chat";
import Channels from "../components/Tabs/Channels";

// components
import { compose, graphql } from "react-apollo";
import {
  GET_AUTH_USERS_QUERY,
  GET_AUTH_USER_SUBSCRIPTIONS_QUERY,
  GET_AUTH_USERS_POST_QUERY
} from "../graphql";
import theme from "../libs/theme";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
      authUser: null,
      loading: true
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentWillMount() {
    this.init(this.props);
  }

  async componentWillReceiveProps(props) {
    this.init(props);
  }

  async init(props) {
    const {
      getAuthUser,
      getChannelSubscriptionsQuery,
      getAuthUsersPostQuery
    } = props;

    const loading =
      getAuthUser.loading ||
      getChannelSubscriptionsQuery.loading ||
      getAuthUsersPostQuery.loading;

    this.setState({
      authUser: getAuthUser.user,
      loading
    });
  }

  render() {
    return (
      <Container>
        <Header hasTabs style={{ backgroundColor: theme.background.primary }}>
          <Body>
            <Title style={styles.text}>SocialStock</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon
                name="search"
                style={styles.icon}
                onPress={() => this.props.navigation.navigate("SearchScreen")}
              />
            </Button>
            <Button transparent>
              <Icon
                name="notifications-active" //notifications-none
                type="MaterialIcons"
                style={styles.notification}
                onPress={() =>
                  this.props.navigation.navigate("NotificationScreen")
                }
              />
            </Button>
            <Button transparent>
              <Home {...this.props} currentTab={this.state.currentTab} />
            </Button>
          </Right>
        </Header>

        <Tabs
          initialPage={0}
          onChangeTab={tab => this.setState({ currentTab: tab.i })}
        >
          <Tab
            textStyle={styles.text}
            activeTextStyle={styles.activeText}
            tabStyle={styles.tabs}
            activeTabStyle={styles.activeTabs}
            heading="Calls"
          >
            {this.state.loading && (
              <Spinner
                color="#000"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />
            )}
            {!this.state.loading && (
              <Feeds {...this.props} subscriber_id={this.state.authUser.id} />
            )}
          </Tab>
          <Tab
            textStyle={styles.text}
            activeTextStyle={styles.activeText}
            tabStyle={styles.tabs}
            activeTabStyle={styles.activeTabs}
            heading="Channels"
          >
            {this.state.loading && (
              <Spinner
                color="#000"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />
            )}
            {!this.state.loading && (
              <Channels
                {...this.props}
                screen="HomeScreen"
                subscriber_id={this.state.authUser.id}
                showFab={true}
              />
            )}
          </Tab>
          <Tab
            textStyle={styles.text}
            activeTextStyle={styles.activeText}
            tabStyle={styles.tabs}
            activeTabStyle={styles.activeTabs}
            heading="Chat"
          >
            {this.state.loading && (
              <Spinner
                color="#000"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />
            )}
            {!this.state.loading && <Chat {...this.props} />}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: "white",
    padding: 5
  },

  notification: {
    color: "cyan",
    padding: 5
  },

  tabs: {
    backgroundColor: theme.background.primary
  },

  activeTabs: {
    backgroundColor: theme.background.primary
  },

  text: {
    color: "white",
    fontWeight: "normal"
  },

  activeText: {
    color: "white",
    fontWeight: "bold"
  }
});

export default compose(
  graphql(GET_AUTH_USERS_QUERY, { name: "getAuthUser" }),
  graphql(GET_AUTH_USER_SUBSCRIPTIONS_QUERY, {
    name: "getChannelSubscriptionsQuery"
  }),
  graphql(GET_AUTH_USERS_POST_QUERY, {
    name: "getAuthUsersPostQuery"
  })
)(HomeScreen);
