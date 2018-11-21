import AddMoneyScreen from "./app/screens/AddMoneyScreen";
import UserTypeScreen from "./app/screens/auth/UserTypeScreen";
import FavoritesScreen from "./app/screens/FavoritesScreen";
import GetStartedScreen from "./app/screens/guest/GetStartedScreen";
import OtpAuthScreen from "./app/screens/guest/OtpAuthScreen";
import VerifyOtpScreen from "./app/screens/guest/VerifyOtpScreen";
import NewsDetailScreen from "./app/screens/NewsDetailScreen";
import ShareScreen from "./app/screens/ShareScreen";
import TabScreen from "./app/screens/TabScreen";
import TutorialsScreen from "./app/screens/TutorialsScreen";

const routes = {
  GetStartedScreen: { screen: GetStartedScreen },
  OtpAuthScreen: { screen: OtpAuthScreen },
  VerifyOtpScreen: { screen: VerifyOtpScreen },
  TabScreen: { screen: TabScreen },
  UserTypeScreen: { screen: UserTypeScreen },
  AddMoneyScreen: { screen: AddMoneyScreen },
  NewsDetailScreen: { screen: NewsDetailScreen },
  ShareScreen: { screen: ShareScreen },
  TutorialsScreen: { screen: TutorialsScreen },
  FavoritesScreen: { screen: FavoritesScreen }
};

export { routes };
