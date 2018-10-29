import React from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity, ImageBackground,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import styles from '../../styles/GettingStartedScreen';

const contract = require('../../../assets/images/contract.png');
const background = require('../../../assets/images/background.png');

class GetStartedScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      agree: false,
      termsText:
        '<h1>Dulce amarum, leve asperum, prope longe, stare movere, quadratum rotundum.</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non laboro, inquit, de nomine. Bonum incolumis acies: misera caecitas. Contineo me ab exemplis. Egone quaeris, inquit, quid sentiam? De illis, cum volemus. Duo Reges: constructio interrete. An tu me de L. </p><h5>Quid, de quo nulla dissensio est?</h5><p>Cur post Tarentum ad Archytam? Nam ista vestra: Si gravis, brevis; Quid est igitur, inquit, quod requiras? Sequitur disserendi ratio cognitioque naturae; </p><h1>Quod autem principium officii quaerunt, melius quam Pyrrho;</h1><p>Respondent extrema primis, media utrisque, omnia omnibus. Non semper, inquam; Quis istud, quaeso, nesciebat? Ita prorsus, inquam; Ne discipulum abducam, times. </p><p>Erat enim Polemonis. Praeclare hoc quidem. At multis malis affectus. Nulla erit controversia. </p><p>Sullae consulatum? Quod autem ratione actum est, id officium appellamus. Verum hoc idem saepe faciamus. Itaque his sapiens semper vacabit. </p><p>Obsecro, inquit, Torquate, haec dicit Epicurus? Cur post Tarentum ad Archytam? Honesta oratio, Socratica, Platonis etiam. At certe gravius. Restatis igitur vos; Quorum sine causa fieri nihil putandum est. Etenim semper illud extra est, quod arte comprehenditur. </p><h4>Dat enim intervalla et relaxat.</h4><p>Quae autem natura suae primae institutionis oblita est? Videsne, ut haec concinant? Sed quid attinet de rebus tam apertis plura requirere? Nosti, credo, illud: Nemo pius est, qui pietatem-; Quae cum dixisset paulumque institisset, Quid est? Nunc omni virtuti vitium contrario nomine opponitur. Facillimum id quidem est, inquam. </p><h3>Sed eum qui audiebant, quoad poterant, defendebant sententiam suam.</h3><p>Quid enim est a Chrysippo praetermissum in Stoicis? Cur igitur, inquam, res tam dissimiles eodem nomine appellas? Dat enim intervalla et relaxat. Idem adhuc; Id mihi magnum videtur. Sed residamus, inquit, si placet. </p><h6>Isto modo ne improbos quidem, si essent boni viri.</h6><p>Prioris generis est docilitas, memoria; Qua tu etiam inprudens utebare non numquam. Nullus est igitur cuiusquam dies natalis. Aliter enim explicari, quod quaeritur, non potest. Summae mihi videtur inscitiae. Est, ut dicis, inquit; </p><h2>Istam voluptatem perpetuam quis potest praestare sapienti?</h2><p>Quid ergo hoc loco intellegit honestum? Nemo igitur esse beatus potest. Si qua in iis corrigere voluit, deteriora fecit. Comprehensum, quod cognitum non habet? Nescio quo modo praetervolavit oratio. Sine ea igitur iucunde negat posse se vivere? Cum audissem Antiochum, Brute, ut solebam, cum M. Qualem igitur hominem natura inchoavit? </p>',
    };
  }

  render() {
    const { termsText, agree } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.blurBackground}
          resizeMode="cover"
          resizeMethod="auto"
          blurRadius={10}
          source={background}
        >
          <View style={styles.termsWrapper}>
            <Image style={styles.termsIcon} source={contract} />

            <Text style={styles.termsHeader}>
TERMS & CONDITIONS
            </Text>
          </View>

          <ScrollView>
            <Text style={styles.termsBody}>
              {termsText}
            </Text>
          </ScrollView>

          <View style={styles.agreeWrapper}>
            <CheckBox
              isChecked={agree}
              checkedColor="white"
              onClick={() => this.setState({ agree: !agree })}
            />

            <Text style={styles.agreeText}>
I have read all the terms & conditions.
            </Text>
          </View>

          <View style={styles.agreeButton}>
            <TouchableOpacity
              disabled={!agree}
              style={agree ? styles.submitButton : styles.submitButtonDisabled}
              onPress={() => navigation.replace('OAuthScreen')}
            >
              <Text style={agree ? styles.submitButtonText : styles.submitButtonTextDisabled}>
                Agree & Continue
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default GetStartedScreen;
