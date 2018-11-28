import { StyleSheet } from 'react-native';
import theme from '../../libs/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  icon: {
    margin: 13,
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signal: {
    marginTop: 10,
    marginLeft: 10,
    color: 'black',
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    fontSize: 22,
  },

  text: {
    textAlign: 'center',
    color: 'black',
    fontFamily: theme.fonts.TitilliumWebRegular,
    fontSize: 24,
  },
});
