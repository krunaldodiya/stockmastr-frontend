import { StyleSheet } from 'react-native';
import theme from '../libs/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#68b2e3',
  },
  submitButtonWrapper: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginTop: 50,
  },
  submitButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  submitButtonText: {
    textAlign: 'center',
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: 'white',
  },
  spinner: {
    color: 'white',
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
    fontFamily: theme.fonts.TitilliumWebSemiBold,
  },
});