import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Ylapalkki from './src/components/Ylapalkki';
import Navigaatio from './src/components/Navigaatio';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PaperProvider, Portal } from 'react-native-paper';
import EnsimmaisenAvauskerranDialogi from './src/components/EnsimmaisenAvauskerranDialogi';
import { tietokanta } from './src/database/tietokanta';
import TreenipohjanLiikkeetDialogi from './src/components/treeninakymanKomponentit/TreenipohjanLiikkeetDialogi';
import TreenipohjanValintaDialogi from './src/components/treeninakymanKomponentit/TreenipohjanValintaDialogi';
import TehtyLiikeDialogi from './src/components/treeninakymanKomponentit/TehtyLiikeDialogi';
import TreenihistoriaTreeniTarkasteluDialogi from './src/components/aloitusnakymanKomponentit/TreenihistoriaTreeniTarkasteluDialogi';

const App : React.FC = () : React.ReactElement => {

  //Alustetaan tietokanta
  tietokanta.init();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={{flex : 1}}>
          <PaperProvider>
            <Portal>
              
              <Ylapalkki />          
              
              <Navigaatio />

              <EnsimmaisenAvauskerranDialogi />

              <TreenipohjanValintaDialogi />

              <TehtyLiikeDialogi />

              <TreenihistoriaTreeniTarkasteluDialogi />

              <TreenipohjanLiikkeetDialogi />
              
              <StatusBar style="auto" />

            </Portal>
          </PaperProvider>
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;