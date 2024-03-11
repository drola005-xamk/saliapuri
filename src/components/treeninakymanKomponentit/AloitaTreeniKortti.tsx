import 'react-native-get-random-values'
import { Button, Card } from "react-native-paper";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4} from 'uuid';
import { Treeni, asetaTreenipohjanValintaDialogiAuki, lisaaTreeni, tallennaTreenit } from "../../redux/treenitSlice";

const AloitaTreeniKortti : React.FC = () : React.ReactElement => {
  
    const treenit = useSelector((state : RootState) => state.treenit);
    const dispatch : AppDispatch = useDispatch();

    const kasitteleTreeninAloitus = () => {

        console.log("Avataan treenipohjan valinta dialogi!");

        //Jos treeni ei käynnissä avataan dialogi
        if(!treenit.kaynnissaOlevaTreeni) {
            dispatch(asetaTreenipohjanValintaDialogiAuki(true));
        //Jos treeni käynnissä lopetataan treeni
        } else {
            
            //Luodaan uusi treeni
            let uusiTreeni : Treeni = {
                id : uuidv4(),
                treenipohja : treenit.kaynnissaOlevaTreeni.treenipohja,
                tehdytLiikkeet : treenit.kaynnissaOlevaTreeni.tehdytLiikkeet,
                aloitusTimestamp : treenit.kaynnissaOlevaTreeni.aloitusTimestamp,
                lopetusTimestamp : new Date().getTime()
            }

            dispatch(lisaaTreeni(uusiTreeni));
            dispatch(tallennaTreenit());

        }

    }

    return (
        <Card>   
                <Card.Content> 
                    <Button 
                        mode='contained'
                        onPress={() => kasitteleTreeninAloitus()}
                        >{(treenit.kaynnissaOlevaTreeni)
                        ?   <>Lopeta treeni</>
                        :   <>Aloita uusi treeni</>
                        }
                    </Button>
                </Card.Content>
        </Card>
    );
    
}

export default AloitaTreeniKortti;