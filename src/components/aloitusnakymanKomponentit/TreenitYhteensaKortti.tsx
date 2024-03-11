import { Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TreenitYhteensaKortti : React.FC = () : React.ReactElement => {
    
    const treenit = useSelector((state : RootState) => state.treenit);

    return (
        <Card style={{flex : 1, justifyContent : 'space-evenly'}}>

            <Card.Content style={{alignSelf : 'flex-start'}}>
                <Text variant="titleMedium">Treenit</Text>
                <Text variant="bodySmall">yhteensä:</Text>
            </Card.Content>

            <Card.Content style={{alignSelf : 'flex-end'}}>
                <Text variant="displaySmall">{(treenit.treenit?.length > 0) ? treenit.treenit?.length : 0}</Text>
            </Card.Content>
            
        </Card>
    );
    
}

export default TreenitYhteensaKortti;