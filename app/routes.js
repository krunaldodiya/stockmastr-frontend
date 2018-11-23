import AddMoneyScreen from "./screens/AddMoneyScreen";
import UserTypeScreen from "./screens/auth/UserTypeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import GetStartedScreen from "./screens/guest/GetStartedScreen";
import RequestOtpScreen from "./screens/guest/RequestOtpScreen";
import VerifyOtpScreen from "./screens/guest/VerifyOtpScreen";
import NewsDetailScreen from "./screens/NewsDetailScreen";
import ShareScreen from "./screens/ShareScreen";
import TabScreen from "./screens/TabScreen";
import TutorialsScreen from "./screens/TutorialsScreen";

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
