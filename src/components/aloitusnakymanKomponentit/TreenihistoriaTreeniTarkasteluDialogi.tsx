import { Icon, List, Text, Button, Dialog } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { LiikeToisto, TehtyLiike, tarkasteleTreeniaHistoriasta } from "../../redux/treenitSlice";

const TreenihistoriaTreeniTarkasteluDialogi : React.FC = () : React.ReactElement => {

    const treenit = useSelector((state: RootState) => state.treenit);
    const dispatch: AppDispatch = useDispatch();

    return (
        <Dialog visible={treenit.treenihistoriaTreeniTarkasteluDialogi.auki} style={{ height: 400, overflow: 'hidden' }}>

            <Dialog.Content style={{ marginBottom: -10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text variant='titleMedium'>
                        {treenit.treenihistoriaTreeniTarkasteluDialogi.treeni?.treenipohja.nimi}:
                    </Text>
                    <Icon source='arrow-up-down' size={15} />
                </View>
            </Dialog.Content>

            <Dialog.ScrollArea style={{ height: 200 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
                    {treenit.treenihistoriaTreeniTarkasteluDialogi.treeni?.tehdytLiikkeet.map((tehtyLiike: TehtyLiike, idx: number) => {
                        return (
                            <List.Accordion
                                style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25, margin: 5, borderWidth : 1, borderColor : 'lightgray' }}
                                theme={{ colors: { background: 'transparent' } }}
                                key={idx}
                                title={tehtyLiike.liike.nimi}
                                left={props => <List.Icon {...props} icon="dumbbell" />}>
                                {(tehtyLiike.toistot.length > 0)
                                    ? tehtyLiike.toistot.map((liikeToisto: LiikeToisto, idx: number) => {
                                        return (
                                            (idx !== tehtyLiike.toistot.length - 1)
                                            ?   <List.Item
                                                    key={idx}
                                                    title={`${liikeToisto.maara} x ${liikeToisto.paino}kg`}
                                                    style={{ marginTop: -5, margin: 5, paddingTop: 10, borderLeftWidth : 1, borderRightWidth : 1, borderBottomWidth: 1, borderBottomLeftRadius: 0.1, borderColor : 'lightgray'}}
                                                    left={props => <List.Icon {...props} icon="arm-flex" />}
                                                />
                                            :   <List.Item
                                                    key={idx}
                                                    title={`${liikeToisto.maara} x ${liikeToisto.paino}kg`}
                                                    style={{ marginTop: -5, marginBottom : -5, margin: 5, paddingTop: 10, borderLeftWidth : 1, borderRightWidth : 1, borderBottomLeftRadius : 25, borderBottomRightRadius : 25, borderBottomWidth : 1, borderColor : 'lightgray'}}
                                                    left={props => <List.Icon {...props} icon="arm-flex" />}
                                                />
                                        );
                                    })
                                    : <List.Item
                                        title="Ei tehtyjä toistoja."
                                        style={{ marginTop: -5, marginBottom : -5, margin: 5, paddingTop: 10, borderLeftWidth : 1, borderRightWidth : 1, borderBottomLeftRadius : 25, borderBottomRightRadius : 25, borderBottomWidth : 1, borderColor : 'lightgray' }}
                                        left={props => <List.Icon {...props} icon="cancel" />}
                                    />
                                }


                                <List.Section style={{ marginTop: -5, margin: 5, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, paddingTop: 10 }}>
                                    <></>
                                </List.Section>

                            </List.Accordion>
                        );
                    })}
                </ScrollView>
            </Dialog.ScrollArea>

            <Dialog.Content>
                <Button
                    icon='close'
                    mode='contained'
                    onPress={() => { dispatch(tarkasteleTreeniaHistoriasta({ auki: false, treeni: null })) }}
                >Sulje
                </Button>
            </Dialog.Content>

        </Dialog>
    );

}

export default TreenihistoriaTreeniTarkasteluDialogi;