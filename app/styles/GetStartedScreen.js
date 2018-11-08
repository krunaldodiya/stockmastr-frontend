import { StyleSheet } from 'react-native';
import theme from '../libs/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#68b2e3',
  },
  termsWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    paddingHorizontal: 20,
    fontSize: 12,
    fontFamily: theme.fonts.TitilliumWebRegular,
  },
  blurView: {
    padding: 20,
  },
  agreeWrapper: {
    flexDirection: 'row',
  },
  agreeText: {
    marginLeft: 10,
    marginTop: 1,
    fontSize: 14,
    fontFamily: theme.fonts.TitilliumWebSemiBold,
  },
  submitButtonWrapper: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginTop: 20,
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
