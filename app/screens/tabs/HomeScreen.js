import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../libs/theme';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: null,
      news: [
        {
          title: 'India Exempted From "Certain" US Sanctions Over Chabahar Port In Iran',
          image:
            'https://i.ndtvimg.com/i/2017-11/chabahar-port-iran-india-website_240x180_61510738762.jpg',
        },
        {
          title: 'On Diwali, Delhi Cops Prep To Enforce 2-Hour Window For Bursting Crackers',
          image:
            'https://c.ndtvimg.com/2018-11/8vlf527o_happy-diwali_afp_120x90_07_November_18.jpg',
        },
        {
          title: "No End To Mizoram Standoff, Protestors Demand Election Officer's Removal",
          image: 'https://c.ndtvimg.com/2018-11/4hs7uga_mizoram_120x90_06_November_18.jpg',
        },
        {
          title: "Why Can't We Talk To People Politely ? - Rajnath Singh To Delhi Police",
          image: 'https://c.ndtvimg.com/2018-11/u8gj7dm8_rajnath-singh_120x90_07_November_18.jpg',
        },
        {
          title: 'PM Modi Celebrates Diwali With Soldiers, Visits Kedarnath Temple: Live Updates',
          image:
            'https://c.ndtvimg.com/2018-11/rh7l2398_pm-modi-in-kedarnath_diwali-_120x90_07_November_18.jpg',
        },
      ],
      grids: [
        { title: 'CALLS', icon: 'sticky-note' },
        { title: 'CHANNELS', icon: 'th-list' },
        { title: 'MARKET', icon: 'line-chart' },
        { title: 'FAVORITES', icon: 'heart' },
        { title: 'TUTORIALS', icon: 'graduation-cap' },
        { title: 'SHARE', icon: 'share' },
      ],
    };
  }

  render() {
    const { loaded, news, grids } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: '40%' }}>
          <Swiper
            loadMinimal
            loadMinimalSize={1}
            loop
            dotColor="gray"
            activeDotColor="white"
            autoplay
            autoplayTimeout="3"
          >
            {news.map(data => (
              <ImageBackground
                source={{ uri: data.image }}
                resizeMode="stretch"
                style={{ flex: 1 }}
              >
                <View style={{ flex: 1, padding: 10, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 24,
                      fontFamily: theme.fonts.TitilliumWebSemiBold,
                      height: '60%',
                    }}
                  >
                    {data.title}
                  </Text>

                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      fontFamily: theme.fonts.TitilliumWebRegular,
                      marginTop: 15,
                    }}
                  >
                    Read More
                  </Text>

                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: theme.fonts.TitilliumWebLight,
                      marginTop: 5,
                    }}
                  >
                    14 mins ago
                  </Text>
                </View>
              </ImageBackground>
            ))}
          </Swiper>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {grids.map(grid => (
            <View
              style={{
                height: '50%',
                width: '33.33%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name={grid.icon} color="black" size={52} style={{ marginBottom: 20 }} />

              <Text style={{ fontFamily: theme.fonts.TitilliumWebSemiBold }}>
                {grid.title}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
            backgroundColor: '#0f0f0f',
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Icon name="home" color="cyan" size={32} style={{ alignSelf: 'center' }} />
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Icon name="bell" color="white" size={24} style={{ alignSelf: 'center' }} />
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Icon name="file-text" color="white" size={24} style={{ alignSelf: 'center' }} />
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Icon name="bars" color="white" size={28} style={{ alignSelf: 'center' }} />
          </View>
        </View>
      </View>
    );
  }
}
