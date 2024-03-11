import { Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Treeni } from "../../redux/treenitSlice";

const TreenitTallaViikollaKortti : React.FC = () : React.ReactElement => {
    
    const treenit = useSelector((state : RootState) => state.treenit);

    //Haetaan tämän viikon alku ja loppu
    const haeViikonAlkuJaLoppu = () : { maanantai: Date; sunnuntai: Date } => {
        
        const dateNyt = new Date();
        let paivaNyt = dateNyt.getDay();

        //Jos sunnuntai 
        if (paivaNyt === 0) {
            paivaNyt = 7
        }

        const maanantai = new Date(dateNyt);
        maanantai.setDate(dateNyt.getDate() - paivaNyt + 1);
        maanantai.setHours(0, 0, 0, 0);
      
        const sunnuntai = new Date(dateNyt);
        sunnuntai.setDate(dateNyt.getDate() + (7 - paivaNyt));
        sunnuntai.setHours(23, 59, 59, 999);
      
        return { maanantai, sunnuntai };
    }
      
    //Filtteröidään tämän viikon treenit
    const treenitTallaViikolla = (): Treeni[] => {
        
        const { maanantai, sunnuntai } = haeViikonAlkuJaLoppu();

        //Palautetaan treenitlista jossa pvmaika nykyisen viikon sisällä
        return treenit.treenit?.filter((treeni) => {
            const treeniDate = new Date(treeni.aloitusTimestamp);
            return treeniDate >= maanantai && treeniDate <= sunnuntai;
        });

    }

    return (
        <Card style={{flex : 1, justifyContent : 'space-evenly', marginLeft : 10}}>
                    <Card.Content>
                        <Text variant="titleMedium">Treenit</Text>
                        <Text variant="bodySmall">tällä viikolla:</Text>
                    </Card.Content>
                    <Card.Content style={{alignSelf : 'flex-end'}}>
                        <Text variant="displaySmall">{(treenitTallaViikolla()?.length > 0) ? treenitTallaViikolla()?.length : 0}</Text>
                    </Card.Content>
                </Card>
    );
    
}

export default TreenitTallaViikollaKortti;