import { Card, Icon, List, Text } from "react-native-paper";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Treenipohja, asetaTreenipohjienLiikkeidenDialogiAuki, poistaTreenipohja, tallennaTreenipohjat } from "../../redux/treenipohjatSlice";

const TreenipohjienMuokkausKortti : React.FC = (): React.ReactElement => {

    const treenipohjat = useSelector((state : RootState) => state.treenipohjat);
    const dispatch : AppDispatch = useDispatch();


    const kasittelePoisto = (treenipohja : Treenipohja) => {

        dispatch(poistaTreenipohja(treenipohja));
        dispatch(tallennaTreenipohjat());

    }

    return (
        <Card style={{flex : 1, overflow : 'hidden', paddingBottom : 40}}>
            <Card.Content>

                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                    <Text variant='titleMedium'>Treenipohjat:</Text>
                    <Icon source='arrow-up-down' size={15}/>
                </View>
                
                <List.Section>
                    <ScrollView showsVerticalScrollIndicator={false}>
                            
                        {(treenipohjat.treenipohjat?.length > 0)
                        ?   treenipohjat.treenipohjat.map((treenipohja : Treenipohja, idx : number) => {
                                return(
                                    <List.Item 
                                        key={idx}
                                        title={`${treenipohja.nimi} (${treenipohja.liikkeet.length})`} 
                                        left={props => <List.Icon {...props} icon="weight-lifter" />}
                                        right={props => <>
                                                            <TouchableOpacity onPress={() => {dispatch(asetaTreenipohjienLiikkeidenDialogiAuki({auki : true, treenipohja : treenipohja, valitutLiikkeet : treenipohja.liikkeet}))}}>
                                                                <List.Icon {...props} icon="pencil" />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onLongPress={() => {kasittelePoisto(treenipohja)}}>
                                                                <List.Icon {...props} icon="delete" />
                                                            </TouchableOpacity>
                                                        </>
                                        }                                                            
                                    />
                                );
                            })
                        :   <List.Item
                                title="Ei vielä treenipohjia."
                                left={props => <List.Icon {...props} icon="cancel" />}
                            />
                        }
                       
                    </ScrollView>
                </List.Section>

            </Card.Content>
        </Card>
    );

}

export default TreenipohjienMuokkausKortti;