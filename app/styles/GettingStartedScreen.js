import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  blurBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsIcon: {
    width: 40,
    height: 40,
  },
  termsHeader: {
    fontWeight: '400',
    fontFamily: 'TitilliumWeb-SemiBold',
    color: 'black',
    fontSize: 22,
    paddingLeft: 20,
    paddingTop: 5,
  },
  termsBody: {
    fontSize: 12,
    fontFamily: 'TitilliumWeb-Regular',
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
    color: 'white',
  },
  submitButtonTextDisabled: {
    textAlign: 'center',
    color: '#ccc',
  },
});
