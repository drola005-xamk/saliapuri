import 'react-native-get-random-values'
import { Button, Dialog, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { v4 as uuidv4} from 'uuid';
import { ScrollView } from "react-native";
import { Treenipohja } from "../../redux/treenipohjatSlice";
import { Treeni, asetaKaynnissaOlevaTreeni, asetaTreenipohjanValintaDialogiAuki } from "../../redux/treenitSlice";


const TreenipohjanValintaDialogi: React.FC = (): React.ReactElement => {

    const treenit = useSelector((state: RootState) => state.treenit);
    const treenipohjat = useSelector((state: RootState) => state.treenipohjat);
    const dispatch: AppDispatch = useDispatch();

    const kasitteleTreenipohjanValinta = (treenipohja : Treenipohja) => {

        let uusiTreeni : Treeni = {
            id : uuidv4(),
            treenipohja : treenipohja,
            tehdytLiikkeet : treenipohja.liikkeet.map((liike) => ({
                liike: liike,
                toistot: [],
            })),
            aloitusTimestamp : new Date().getTime(),
            lopetusTimestamp : 0
        }

        dispatch(asetaKaynnissaOlevaTreeni(uusiTreeni));

    }

    return (
        <Dialog style={{ maxHeight: '70%' }} visible={treenit.treenipohjanValintaDialogi.auki} dismissable={false}>
            
            <Dialog.Title>Valitse treenipohja:</Dialog.Title>

            <Dialog.ScrollArea>
                <ScrollView>
                    {(treenipohjat.treenipohjat.length > 0)
                    ?   (treenipohjat.treenipohjat.map((treenipohja: Treenipohja, idx: number) => {
                            return (
                                <List.Item
                                    key={idx}
                                    style={{ paddingTop: 10, paddingBottom: 10 }}
                                    left={props => <List.Icon {...props} icon="weight-lifter" />}
                                    onPress={() => {kasitteleTreenipohjanValinta(treenipohja)}}
                                    title={treenipohja.nimi}
                                    description={`Liikkeitä: ${treenipohja.liikkeet.length}`}
                                />
                            );
                        }))
                    :   <List.Item
                            style={{ paddingTop: 10, paddingBottom: 10 }}
                            left={props => <List.Icon {...props} icon="cancel" />}
                            title="Ei luotuja treenipohjia."
                        />
                    }
                    
                </ScrollView>
            </Dialog.ScrollArea>

            <Dialog.Content>

                <Button
                    mode='contained'
                    style={{ marginTop: 10 }}
                    disabled={false}
                    buttonColor="gray"
                    onPress={() => {dispatch(asetaTreenipohjanValintaDialogiAuki(false))}}
                >Peruuta
                </Button>

            </Dialog.Content>
            
        </Dialog>
    );
}

export default TreenipohjanValintaDialogi;