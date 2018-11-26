import AddMoneyScreen from "./containers/AddMoneyScreen";
import UserTypeScreen from "./containers/auth/UserTypeScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import GetStartedScreen from "./containers/guest/GetStartedScreen";
import RequestOtpScreen from "./containers/guest/RequestOtpScreen";
import VerifyOtpScreen from "./containers/guest/VerifyOtpScreen";
import NewsDetailScreen from "./containers/NewsDetailScreen";
import ShareScreen from "./containers/ShareScreen";
import TabScreen from "./containers/TabScreen";
import TutorialsScreen from "./containers/TutorialsScreen";

const routes = {
  GetStartedScreen: { screen: GetStartedScreen },
  RequestOtpScreen: { screen: RequestOtpScreen },
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
