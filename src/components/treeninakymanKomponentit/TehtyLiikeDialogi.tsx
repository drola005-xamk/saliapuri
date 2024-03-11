import 'react-native-get-random-values'
import { v4 as uuidv4} from 'uuid';
import { Button, Dialog, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useState } from "react";
import { View } from "react-native";
import { LiikeToisto, asetaTehtyLiikeDialogiAuki, lisaaLiikeToisto } from "../../redux/treenitSlice";


const TehtyLiikeDialogi : React.FC = () : React.ReactElement => {

    const [maara, setMaara] = useState<string>('');
    const [paino, setPaino] = useState<string>('');

    const treenit = useSelector((state : RootState) => state.treenit);
    const dispatch : AppDispatch = useDispatch();

    const tekstinKasittelija = () => {

        //Luodaan uusi LiikeToisto
        let uusiLiikeToisto : LiikeToisto = {
            id : uuidv4(),
            maara : Number(maara),
            paino : Number(paino)
        }

        //Lisätään uusi liiketoisto
        dispatch(lisaaLiikeToisto(uusiLiikeToisto));

        //Nollataan tekstikentät
        setMaara(''),
        setPaino('')

    }

    return (
        <Dialog visible={treenit.tehtyLiikeDialogi.auki} dismissable={false}>
            {(treenit.tehtyLiikeDialogi.liike !== null)
            ?   <>
                    <Dialog.Title>
                        {`${treenit.tehtyLiikeDialogi.liike?.nimi}:`}
                    </Dialog.Title>

                    <Dialog.Content>

                        <View style={{flexDirection : 'row'}}>
                            <TextInput 
                                style={{flex: 1}}
                                mode='outlined' 
                                label="Määrä" 
                                placeholder="Tehty määrä..."
                                keyboardType="numeric" 
                                value={maara}
                                onChangeText={(text) => setMaara(text)}
                            />

                            <TextInput 
                                style={{flex: 1, marginLeft : 10}}
                                mode='outlined' 
                                label="Paino kg" 
                                placeholder="Tehty painolla..." 
                                keyboardType="numeric" 
                                value={paino}
                                onChangeText={(text) => setPaino(text)}
                            />
                        </View>

                        <View style={{flexDirection : 'row'}}>
                            <Button 
                                mode='contained' 
                                style={{marginTop : 10, flex : 1}}
                                buttonColor="gray"
                                onPress={() => {
                                    dispatch(asetaTehtyLiikeDialogiAuki({auki : false, liike : null}));
                                    setMaara('');
                                    setPaino('');
                                }}
                                >Peruuta
                            </Button>

                            <Button 
                                mode='contained' 
                                style={{marginTop : 10, flex : 1, marginLeft : 10}}
                                disabled={(maara.length < 1 || paino.length < 1)}
                                onPress={() => tekstinKasittelija()}
                                >Lisää toisto
                            </Button>
                        </View>
                        
                    </Dialog.Content>
                </>
            :   null
            }
            
        </Dialog>
    );
}

export default TehtyLiikeDialogi;