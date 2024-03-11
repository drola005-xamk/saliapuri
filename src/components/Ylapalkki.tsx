import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { asetaOhjeetAuki, haeKayttaja } from '../redux/kayttajaSlice';
import { useEffect } from 'react';
import { haeTreenit } from '../redux/treenitSlice';
import { haeLiikkeet } from '../redux/liikkeetSlice';
import { haeTreenipohjat } from '../redux/treenipohjatSlice';

const Ylapalkki : React.FC = () : React.ReactElement => {
    
    const kayttaja = useSelector((state : RootState) => state.kayttaja);
    const dispatch : AppDispatch = useDispatch();

    //Tämä komponentti kokoajan näkyvillä joten kutsutaan täällä
    useEffect(() => {

        dispatch(haeKayttaja());
        dispatch(haeTreenit());
        dispatch(haeLiikkeet());
        dispatch(haeTreenipohjat());
            
    }, [dispatch]);
    
    return (
        <Appbar.Header mode='center-aligned'>
            <Appbar.Action icon="weight-lifter"/>
            <Appbar.Content title="Sali Apuri"/>
            <Appbar.Action icon="help-circle-outline" onPress={() => {dispatch(asetaOhjeetAuki(!kayttaja.ohjeet))}}/>
        </Appbar.Header>
    );
}

export default Ylapalkki;