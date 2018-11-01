import { StyleSheet } from 'react-native';
import theme from '../libs/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#68b2e3',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: theme.fonts.TitilliumWebBold,
  },
});
