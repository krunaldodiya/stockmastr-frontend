import Spinner from "react-native-loading-spinner-overlay";
import styles from "./styles";

const Loader = props => (
  <Spinner
    visible={props.loading}
    textContent="Loading..."
    textStyle={styles.spinner}
    overlayColor="rgba(0,0,0,0.8)"
  />
);

export default Loader;
