import { google, facebook } from 'react-native-simple-auth';

const makeSocialAuth = async (gateway) => {
  switch (gateway) {
    case 'google':
      return google({
        appId: '700045608007-77iit7ov1thbbcmr2olfmsf1a2ategh7.apps.googleusercontent.com',
        callback: 'com.socialstock:/oauth2redirect',
      });

    case 'facebook':
      return facebook({
        appId: '1941481456155598',
        callback: 'fb1941481456155598://authorize',
      });

    default:
      return null;
  }
};

export { makeSocialAuth };
