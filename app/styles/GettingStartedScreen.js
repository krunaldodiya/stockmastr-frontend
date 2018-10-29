import { StyleSheet } from 'react-native';
import theme from '../libs/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  blurBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  termsWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
  },
  termsIcon: {
    width: 40,
    height: 40,
  },
  termsHeader: {
    fontWeight: '400',
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: 'black',
    fontSize: 22,
    marginLeft: 10,
    marginTop: 3,
  },
  termsBody: {
    fontSize: 12,
    fontFamily: theme.fonts.TitilliumWebRegular,
  },
  agreeWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  agreeText: {
    marginLeft: 10,
    marginTop: 1,
    fontSize: 14,
    fontFamily: theme.fonts.TitilliumWebSemiBold,
  },
  agreeButton: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  submitButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  submitButtonDisabled: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ddd',
  },
  submitButtonText: {
    textAlign: 'center',
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: 'white',
  },
  submitButtonTextDisabled: {
    textAlign: 'center',
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: '#ccc',
  },
});
