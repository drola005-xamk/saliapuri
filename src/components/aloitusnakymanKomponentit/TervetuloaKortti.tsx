import { Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TervetuloaKortti : React.FC = () : React.ReactElement => {

  const kayttaja = useSelector((state: RootState) => state.kayttaja);

  //Haetaan oikea päivän ajankohta tervehdykseen
  const haePaivanAjankohta = () => {

    const tunnitNyt = new Date().getHours();

    if (tunnitNyt >= 5 && tunnitNyt < 12) {
      return 'huomenta';
    } else if (tunnitNyt >= 12 && tunnitNyt < 18) {
      return 'päivää';
    } else {
      return 'iltaa';
    }

  };

  return (
    <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Card.Content>
        <Text variant="titleMedium">{`Hyvää ${haePaivanAjankohta()}, ${kayttaja.kayttaja?.nimi}!`}</Text>
      </Card.Content>
    </Card>
  );

}

export default TervetuloaKortti;