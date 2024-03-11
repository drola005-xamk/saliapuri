import { View } from 'react-native';
import TreenitYhteensaKortti from './aloitusnakymanKomponentit/TreenitYhteensaKortti';
import TreenitTallaViikollaKortti from './aloitusnakymanKomponentit/TreenitTallaViikollaKortti';
import TervetuloaKortti from './aloitusnakymanKomponentit/TervetuloaKortti';
import TreenihistoriaKortti from './aloitusnakymanKomponentit/TreenihistoriaKortti';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Ohjeet from './Ohjeet';

const AloitusNakyma : React.FC = () : React.ReactElement => {

    const kayttaja = useSelector((state : RootState) => state.kayttaja);

    return (
        
        (Boolean(kayttaja.kayttaja?.nimi))
        ?   <View style={{flex : 1}}>
                
                <View style={{flex : 1, margin : 5}}>
                    <TervetuloaKortti />
                </View>

                <View style={{flex : 2, margin : 5, flexDirection : 'row'}}>

                    <TreenitYhteensaKortti />

                    <TreenitTallaViikollaKortti />

                </View>
                
                <View style={{flex : 7, margin : 5}}>
                    <TreenihistoriaKortti />         
                </View>

                <Ohjeet />
                
            </View>
        :   <></>
        
    );
}

export default AloitusNakyma;