import { Button, Dialog, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { asetaKayttajanNimi, tallennaKayttaja } from "../redux/kayttajaSlice";
import { useState } from "react";


const EnsimmaisenAvauskerranDialogi : React.FC = () : React.ReactElement => {

    const [teksti, setTeksti] = useState<string>('');

    const kayttaja = useSelector((state : RootState) => state.kayttaja);
    const dispatch : AppDispatch = useDispatch();

    const tekstinKasittelija = () => {

        dispatch(asetaKayttajanNimi(teksti));
        dispatch(tallennaKayttaja());

    }

    return (
        <Dialog visible={kayttaja.ensimmaisenAvauskerranDialogi.auki} dismissable={false}>
            
            <Dialog.Icon icon='human-greeting'/>

            <Dialog.Title style={{textAlign : 'center'}}>Tervetuloa!</Dialog.Title>
            
            <Dialog.Content>
                
                <TextInput 
                    mode='outlined' 
                    label="Syötä nimesi..." 
                    placeholder="Etunimi" 
                    value={teksti}
                    onChangeText={(text) => setTeksti(text)}
                />

                <Button 
                    mode='contained' 
                    style={{marginTop : 10}}
                    disabled={teksti.length < 1}
                    onPress={() => tekstinKasittelija()}
                    >Tallenna
                </Button>

            </Dialog.Content>
            
        </Dialog>
    );
}

export default EnsimmaisenAvauskerranDialogi;