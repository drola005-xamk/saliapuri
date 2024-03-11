import { Button, Checkbox, Dialog, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { ScrollView } from "react-native";
import { Liike } from "../../redux/liikkeetSlice";
import { asetaTreenipohjienLiikkeidenDialogiAuki, asetaValitutLiikkeetTreenipohjaan, tallennaTreenipohjat, valitseLiike } from "../../redux/treenipohjatSlice";


const TreenipohjanLiikkeetDialogi : React.FC = () : React.ReactElement => {

    const treenipohjat = useSelector((state : RootState) => state.treenipohjat);
    const liikkeet = useSelector((state : RootState) => state.liikkeet);

    const dispatch : AppDispatch = useDispatch();

    const checkboxKasittelija = (liike : Liike) => {

        dispatch(valitseLiike(liike));
    
    }

    const valittujenLiikkeidenKasittelija = () => {

        dispatch(asetaValitutLiikkeetTreenipohjaan(false));
        dispatch(tallennaTreenipohjat());

    }

    return (
        <Dialog style={{height : '50%'}} visible={treenipohjat.treenipohjanLiikkeetDialogi.auki} dismissable={false}>
            
            <Dialog.Title>Treenipohjan liikkeet:</Dialog.Title>

            <Dialog.ScrollArea>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        {(liikkeet.liikkeet?.length > 0)
                        ?   liikkeet.liikkeet.map((liike : Liike, idx : number) => {
                                return(
                                    <List.Item 
                                        key={idx}
                                        title={liike.nimi} 
                                        left={props => <List.Icon {...props} icon="dumbbell" />}
                                        right={props => <Checkbox {...props} 
                                                            onPress={() => {checkboxKasittelija(liike)}} 
                                                            status={treenipohjat.treenipohjanLiikkeetDialogi.valitutLiikkeet.some((valittuLiike) => valittuLiike.id === liike.id) ? 'checked' : 'unchecked' } 
                                                        />
                                        }
                                    /> 
                                );
                            })
                        :   <List.Item
                                title="Ei vielä liikkeitä."
                                left={props => <List.Icon {...props} icon="cancel" />}
                            />
                        }
               
                </ScrollView>
            </Dialog.ScrollArea>
            
            <Dialog.Content style={{flexDirection : 'row', justifyContent: 'space-between'}}>
                
                <Button 
                    style={{flex : 1}} 
                    buttonColor="gray" 
                    mode='contained'
                    onPress={() => {
                        dispatch(asetaTreenipohjienLiikkeidenDialogiAuki({auki : false, treenipohja : null, valitutLiikkeet : []}))
                    }}
                    >Peruuta
                </Button>

                <Button 
                    style={{flex : 1, marginLeft : 20}} 
                    mode='contained'
                    onPress={() => {
                        valittujenLiikkeidenKasittelija()
                    }}
                    >Tallenna
                </Button>
                
            </Dialog.Content>

        </Dialog>
    );
}

export default TreenipohjanLiikkeetDialogi;