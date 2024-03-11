import 'react-native-get-random-values'
import { Card, IconButton, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Liike, lisaaLiike, tallennaLiikkeet } from "../../redux/liikkeetSlice";
import { v4 as uuidv4} from 'uuid';
import { useState } from "react";
import { Treenipohja, lisaaTreenipohja, tallennaTreenipohjat } from '../../redux/treenipohjatSlice';

const LiikkeidenJaTreenipohjienLisaysKortti : React.FC = () : React.ReactElement => {
    
    const liikkeet = useSelector((state : RootState) => state.liikkeet);
    const dispatch : AppDispatch = useDispatch();

    //Komponenttikohtainen tilamuuttuja
    const [teksti, setTeksti] = useState<string>('');

    //Lisäyksen käsittelijä joka toimii eritavalla riippuen kumpi muokkaustila käynnissä
    const kasitteleLisays = () : void => {

        if (liikkeet.liikkeidenMuokkaustila) {

            let uusiLiike : Liike = {
                id : uuidv4(),
                nimi : teksti
            }

            dispatch(lisaaLiike(uusiLiike));
            dispatch(tallennaLiikkeet());
            
        
        } else {

            let uusiTreenipohja : Treenipohja = {
                id : uuidv4(),
                nimi : teksti,
                liikkeet : []
            }

            dispatch(lisaaTreenipohja(uusiTreenipohja));
            dispatch(tallennaTreenipohjat());
            
        }

        setTeksti('');

    }

    return (
        <Card>   
               <Card.Actions>
                
                    <TextInput 
                        dense={true} 
                        style={{flex : 9}}
                        value={teksti}
                        onChangeText={(text) => {setTeksti(text)}}
                        placeholder={(liikkeet.liikkeidenMuokkaustila) ? 'Syötä liikkeen nimi....' : 'Anna treenipohjalle nimi...'}
                    />
                    
                    <IconButton 
                        icon='plus'
                        onPress={() => kasitteleLisays()}
                        disabled={teksti.length < 1}
                    />
            
                </Card.Actions>
        </Card>
    );
    
}

export default LiikkeidenJaTreenipohjienLisaysKortti;