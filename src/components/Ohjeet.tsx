import { Text, Icon, Card } from "react-native-paper";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { asetaOhjeetAuki } from "../redux/kayttajaSlice";

const Ohjeet : React.FC = () : React.ReactElement => {
    
    const kayttaja = useSelector((state : RootState) => state.kayttaja);
    const dispatch : AppDispatch = useDispatch();
    
    return(

        <>
            {(kayttaja.ohjeet)
            ?   <TouchableOpacity style={styles.ohjeetPohja} onPress={() => dispatch(asetaOhjeetAuki(false))} activeOpacity={1}>
                        
                    <View style={[styles.apuTeksti, styles.apuOikeaYla]}>
                        <Card>
                            <Card.Content style={{flexDirection : 'row'}}>
                                <Text variant='bodySmall'>Avaa tai sulje ohjeet </Text>
                                <Icon source='arrow-up' size={20}/>
                            </Card.Content>
                        </Card>
                        
                    </View>

                    <View style={[styles.apuTeksti, styles.apuVasenAla]}>
                        <Card>
                            <Card.Content style={{alignItems : 'center'}}>
                                <Text variant='bodySmall'>Avaa kotinäkymä</Text>
                                <Icon source='arrow-down' size={20}/>
                            </Card.Content>
                        </Card>
                    </View>

                    <View style={[styles.apuTeksti, styles.apuOikeaAla]}>
                        <Card>
                            <Card.Content style={{alignItems : 'center'}}>
                                <Text variant='bodySmall'>Avaa treeninäkymä</Text>
                                <Icon source='arrow-down' size={20}/>
                            </Card.Content>
                        </Card>
                    </View>

                    <View style={styles.apuKeski}>
                        <Card>
                            <Card.Content style={{alignItems : 'center'}}>

                                <Text variant='titleLarge'>Sovelluksen kehittänyt:</Text>

                                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                    <Icon source='linkedin' size={20}/>
                                    <Text 
                                        onPress={() => Linking.openURL('https://www.linkedin.com/in/roope-lappalainen-21b012234/')} 
                                        variant='bodyLarge' style={{color:'blue', textDecorationLine:'underline'}}
                                        > Roope Lappalainen
                                    </Text>
                                </View>

                            </Card.Content>
                        </Card>
                    </View>
                        
                </TouchableOpacity>
            :   null
            }
        </>
    );
}

const styles = StyleSheet.create({
    ohjeetPohja : {
        flex : 1,
        width : '100%',
        height : '100%',
        backgroundColor : 'rgba(52, 52, 52, 0.5)',
        position : "absolute",
        
    },
    apuTeksti : {
        position : 'absolute',
        justifyContent : 'center',
        alignItems : 'center',
        padding : 15,
        borderRadius : 25
    },
    apuVasenAla: {
        bottom : 0,
        marginBottom: 0,
        marginLeft : 0,
        left : 25
    },
    apuOikeaAla: {
        bottom : 0,
        marginBottom: 0,
        marginRight : 0,
        right : 25
    },
    apuOikeaYla: {
        top : 0,
        marginTop: 0,
        marginRight : 0,
        right : -10,
        flexDirection : 'row'
    },
    apuKeski : {
        position : 'absolute',
        justifyContent : 'center',
        alignItems : 'center',
        paddingLeft : 20,
        paddingRight : 20,
        borderRadius : 25,
        alignSelf : 'center',
        top : 230,
        height : 100

    }
});

export default Ohjeet;