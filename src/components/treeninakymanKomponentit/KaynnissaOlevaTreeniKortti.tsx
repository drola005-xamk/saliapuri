import { Card, Icon, List, Text, Button } from "react-native-paper";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { LiikeToisto, TehtyLiike, asetaTehtyLiikeDialogiAuki, poistaLiikeToisto } from "../../redux/treenitSlice";

const KaynnissaOlevaTreeniKortti : React.FC = () : React.ReactElement => {

    const treenit = useSelector((state : RootState) => state.treenit);
    const dispatch : AppDispatch = useDispatch();

    return (
        <Card style={{flex : 1, overflow : 'hidden'}}>
            <Card.Content>

                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                    <Text variant='titleMedium'>{treenit.kaynnissaOlevaTreeni?.treenipohja.nimi}:</Text>
                    <Icon source='arrow-up-down' size={15}/>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom : 20, marginTop : 10}}>
                    {treenit.kaynnissaOlevaTreeni?.tehdytLiikkeet.map((tehtyLiike : TehtyLiike, idx : number) => {
                        return(

                            <List.Accordion
                                style={{ borderTopLeftRadius : 25, borderTopRightRadius : 25, margin : 5, borderWidth: 1, borderColor : 'lightgray' }}
                                theme={{colors: {background: 'transparent'}}}               
                                key={idx}
                                title={tehtyLiike.liike.nimi}
                                left={props => <List.Icon {...props} icon="dumbbell" />}>
                                    {tehtyLiike.toistot.map((liikeToisto : LiikeToisto, idx : number) => {
                                        return (
                                            <List.Item 
                                                key={idx}
                                                title={`${liikeToisto.maara} x ${liikeToisto.paino}kg`} 
                                                style={{marginTop : -5, margin : 5, paddingTop : 10, borderLeftWidth : 1, borderRightWidth : 1, borderBottomWidth: 1, borderBottomLeftRadius: 0.1, borderColor : 'lightgray'}}
                                                left={props => <List.Icon {...props} icon="arm-flex" />}
                                                right={props => <TouchableOpacity 
                                                                    onLongPress={() => dispatch(poistaLiikeToisto({tehtyliike : tehtyLiike, liiketoisto : liikeToisto}))}
                                                                >
                                                                    <List.Icon {...props} icon="delete" />
                                                                </TouchableOpacity>}
                                            />
                                        );
                                    })}
                                    
                                    <List.Section style={{marginTop : -5, margin : 5, borderBottomLeftRadius : 25, borderBottomRightRadius : 25, paddingBottom : 10, paddingTop : 10, borderLeftWidth : 1, borderRightWidth : 1, borderBottomWidth : 1, borderColor : 'lightgray'}}>
                                        <Button 
                                            style={{width : '100%', left: -20}}
                                            icon='plus' 
                                            mode='contained'
                                            onPress={() => {dispatch(asetaTehtyLiikeDialogiAuki({auki : true, liike : tehtyLiike.liike}))}}
                                            >Lisää toistot
                                        </Button>
                                    </List.Section>
                                    
                            </List.Accordion> 

                        );
                    })}
                </ScrollView>
                
            </Card.Content>
        </Card>
    );

}

export default KaynnissaOlevaTreeniKortti;