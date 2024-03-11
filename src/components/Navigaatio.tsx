import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import AloitusNakyma from './AloitusNakyma';
import TreeniNakyma from './TreeniNakyma';

const Navigaatio: React.FC = (): React.ReactElement => {

  //Aloitusnäkymä
  const RouteA = () => (

    <AloitusNakyma />

  );

  //Treeninäkymä
  const RouteB = () => (

    <TreeniNakyma />

  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'a', focusedIcon: 'home' },
    { key: 'b', focusedIcon: 'dumbbell' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    a: RouteA,
    b: RouteB
  });

  return (

    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      labeled={false}
      compact={true}
      barStyle={{}}
      safeAreaInsets={{ top: 0}}
    />

  );

}

export default Navigaatio;