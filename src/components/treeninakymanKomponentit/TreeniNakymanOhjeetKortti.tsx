import { Card, Icon, List, Text } from "react-native-paper";
import { View } from "react-native";

const TreeniNakymanOhjeetKortti: React.FC = (): React.ReactElement => {

    return (
        <Card style={{flex : 1}}>
            <Card.Content>

                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                    <Text variant='titleMedium'>Ohjeet:</Text>
                    <Icon source='help' size={15}/>
                </View>
                
                <List.Section>
                    
                    <List.Item 
                        title="Liikkeet" 
                        description="Voit lisätä, muokata ja poistaa treeniliikkeitä."
                        left={props => <List.Icon {...props} icon="numeric-1" />}
                    />

                    <List.Item 
                        title="Treenipohjat" 
                        description="Voit luoda valmiita treenipohjia lisäämistäsi treeniliikkeistä."
                        left={props => <List.Icon {...props} icon="numeric-2" />}
                    />

                    <List.Item 
                        title="Treenin aloitus" 
                        description='Aloita uusi treeni painamalla alareunan "Aloita uusi treeni"-painiketta.'
                        left={props => <List.Icon {...props} icon="numeric-3" />}
                    />

                </List.Section>
                
            </Card.Content>
        </Card>
    );

}

export default TreeniNakymanOhjeetKortti;