import { Card, Icon, List, Text } from "react-native-paper";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Treeni, poistaTreeni, tallennaTreenit, tarkasteleTreeniaHistoriasta } from "../../redux/treenitSlice";

const TreenihistoriaKortti : React.FC = () : React.ReactElement => {

    const treenit = useSelector((state: RootState) => state.treenit);
    const dispatch: AppDispatch = useDispatch();

    //Muotoillaan timestamp localeStringiksi
    const muotoileTimestampLocaleStringiksi = (timestamp: number) => {
        let date = new Date(timestamp).toLocaleString('fi-FI', { day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
        return date;
    }

    //Muotoillaan timestamp localeTimeStringiksi
    const muotoileTimestampLocaleTimeStringiksi = (timestamp: number) => {
        let date = new Date(timestamp).toLocaleTimeString('fi-FI', { hour: "2-digit", minute: "2-digit" });
        return date;
    }

    //Poiston käsittelijä
    const kasittelePoisto = (treeni: Treeni) => {

        dispatch(poistaTreeni(treeni));
        dispatch(tallennaTreenit());

    }

    return (
        <Card style={{ flex: 1, overflow: 'hidden' }}>
            <Card.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text variant="titleMedium">Treenihistoria:</Text>
                    <Icon source='arrow-up-down' size={15} />
                </View>


                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 20, marginTop: 5 }}>
                    <List.Section>
                       
                        {(treenit.treenit?.length > 0)
                            ? treenit.treenit.map((treeni: Treeni, idx: number) => {
                                return (

                                    <List.Item
                                        key={idx}
                                        style={{ paddingBottom: 10 }}
                                        title={`${treeni.treenipohja.nimi}`}
                                        description={`${muotoileTimestampLocaleStringiksi(treeni.aloitusTimestamp)}-${muotoileTimestampLocaleTimeStringiksi(treeni.lopetusTimestamp)}`}
                                        left={props => <List.Icon {...props} icon='weight-lifter' />}
                                        right={props => <>
                                            <TouchableOpacity
                                                onPress={() => { dispatch(tarkasteleTreeniaHistoriasta({ auki: true, treeni: treeni })) }}
                                            >
                                                <List.Icon {...props} icon='magnify' />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onLongPress={() => { kasittelePoisto(treeni) }}
                                            >
                                                <List.Icon {...props} icon='delete' />
                                            </TouchableOpacity>
                                        </>
                                        }

                                    />

                                );
                            })
                            : <List.Item
                                title="Ei treenejä historiassa."
                                left={props => <List.Icon {...props} icon='cancel' />}
                            />
                        }

                    </List.Section>
                </ScrollView>

            </Card.Content>


        </Card>
    );

}

export default TreenihistoriaKortti;