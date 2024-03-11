import { Card, Icon, List, Text } from "react-native-paper";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Liike, poistaLiike, tallennaLiikkeet } from "../../redux/liikkeetSlice";

const LiikkeidenMuokkausKortti : React.FC = (): React.ReactElement => {

    const liikkeet = useSelector((state : RootState) => state.liikkeet);
    const dispatch : AppDispatch = useDispatch();

    const kasittelePoisto = (liike : Liike) => {

        dispatch(poistaLiike(liike));
        dispatch(tallennaLiikkeet());

    }

    return (
        <Card style={{flex : 1, overflow : 'hidden', paddingBottom : 40}}>
            <Card.Content>

                    <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <Text variant='titleMedium'>Liikkeet:</Text>
                        <Icon source='arrow-up-down' size={15}/>
                    </View>

                    
                    <List.Section>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {(liikkeet.liikkeet?.length > 0)
                            ?   liikkeet.liikkeet.map((liike : Liike, idx : number) => {
                                    return(
                                        <List.Item 
                                            key={idx}
                                            title={liike.nimi} 
                                            left={props => <List.Icon {...props} icon="dumbbell" />}
                                            right={props => <TouchableOpacity onLongPress={() => kasittelePoisto(liike)}>
                                                                <List.Icon {...props} icon="delete" />
                                                            </TouchableOpacity>}
                                            
                                        />
                                        
                                    );
                                })
                            :   <List.Item
                                    title="Ei vielä liikkeitä."
                                    left={props => <List.Icon {...props} icon="cancel" />}
                                />
                            }
                        </ScrollView>
                    </List.Section>
                    
   
            </Card.Content>
        </Card>
    );

}

export default LiikkeidenMuokkausKortti;