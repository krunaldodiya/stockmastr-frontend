import { google, facebook } from 'react-native-simple-auth';
import bugsnag from './bugsnag';

const makeSocialAuth = async (gateway) => {
  try {
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
  } catch (e) {
    bugsnag.notify(e);
  }
};

export { makeSocialAuth };
